import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { projectConfig } from "../../data/projectConfig";
import { useIntroUnlock } from "../../hooks/useIntroUnlock";
import { DriftWall, type DriftWallItem } from "../ui/DriftWall";

type IntroScreenProps = {
  onComplete: () => void;
};

type IntroStage = "ready" | "motion" | "gateway";

const ARGENTINA_TIME_ZONE = "America/Argentina/Cordoba";
const MOTION_DURATION_MS = 7_500;
const REDUCED_MOTION_DURATION_MS = 850;

function formatUnlockDate(date: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ARGENTINA_TIME_ZONE,
  }).format(date);
}

function formatRemainingTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1_000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [
    days > 0 ? `${days} d` : null,
    `${String(hours).padStart(2, "0")} h`,
    `${String(minutes).padStart(2, "0")} min`,
    `${String(seconds).padStart(2, "0")} s`,
  ];
  return parts.filter(Boolean).join(" · ");
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [stage, setStage] = useState<IntroStage>("ready");
  const [leaving, setLeaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startingRef = useRef(false);
  const leavingRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const unlock = useIntroUnlock(projectConfig.intro.unlockAt);
  const wallItems = useMemo<DriftWallItem[]>(
    () =>
      projectConfig.intro.wallImages.map((path, index) => ({
        image: `${import.meta.env.BASE_URL}${path}`,
        title: `Recuerdo ${index + 1}`,
      })),
    [],
  );

  const startExperience = useCallback(async () => {
    if (startingRef.current || stage !== "ready") return;
    startingRef.current = true;

    try {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.8;
        await audio.play();
      }
      setStage("motion");
    } catch {
      // El navegador bloqueó el autoplay. Dejamos el botón visible para que
      // el toque de la persona inicie el audio y la animación sincronizados.
      startingRef.current = false;
    }
  }, [stage]);

  useEffect(() => {
    void startExperience();
  }, [startExperience]);

  useEffect(() => {
    if (stage !== "motion") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stageTimer = window.setTimeout(
      () => setStage("gateway"),
      reduceMotion ? REDUCED_MOTION_DURATION_MS : MOTION_DURATION_MS,
    );
    return () => window.clearTimeout(stageTimer);
  }, [stage]);

  useEffect(
    () => () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    },
    [],
  );

  const finishIntro = useCallback(() => {
    if (!unlock.unlocked || leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitTimerRef.current = window.setTimeout(onComplete, reduceMotion ? 40 : 700);
  }, [onComplete, unlock.unlocked]);

  const scheduleMessage = unlock.configurationError
    ? "El horario cargado no es válido. Revisá la configuración antes de compartir la app."
    : unlock.configured && unlock.unlockDate
      ? `Se desbloquea el ${formatUnlockDate(unlock.unlockDate)}, hora de Córdoba.`
      : "Horario pendiente · el acceso está habilitado para probar la experiencia.";

  return (
    <div
      className={`intro-screen intro-screen--${stage} ${leaving ? "intro-screen--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={
        stage === "motion"
          ? `Feliz cumpleaños, ${projectConfig.recipientName}`
          : projectConfig.intro.welcomeMessage
      }
    >
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/FUEGOS.mp3`}
        preload="auto"
      />

      {stage === "ready" ? (
        <section className="intro-ready">
          <div className="intro-ready__glow" aria-hidden="true" />
          <div className="intro-ready__content">
            <p>Una sorpresa para vos</p>
            <button type="button" onClick={() => void startExperience()}>
              Comenzar
            </button>
            <small>Activá el sonido 💗</small>
          </div>
        </section>
      ) : stage === "motion" ? (
        <section className="intro-kinetic">
          <div className="intro-kinetic__background" aria-hidden="true">
            <img
              className="intro-kinetic__fireworks"
              src={`${import.meta.env.BASE_URL}${projectConfig.intro.fireworksImage}`}
              alt=""
              fetchPriority="high"
            />
            <span className="intro-kinetic__fireworks-shade" />
          </div>

          <p className="intro-kinetic__prelude">Feliz cumpleaños, amor</p>

          <h1
            className="intro-kinetic__words"
            aria-label={`Feliz cumpleaños, ${projectConfig.recipientName}. Te amo, corazón.`}
          >
            {projectConfig.intro.motionWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`intro-kinetic__word intro-kinetic__word--${index + 1}`}
                style={{ "--word-delay": `${0.8 + index * 0.88}s` } as CSSProperties}
                aria-hidden="true"
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="intro-kinetic__closing">Te amo mucho</p>

          <div className="intro-kinetic__progress" aria-hidden="true">
            <span />
          </div>
        </section>
      ) : (
        <section className="intro-gateway">
          <div className="intro-gateway__wall" aria-hidden="true">
            <DriftWall
              items={wallItems}
              columns={2}
              tileWidth={176}
              tileHeight={218}
              gap={14}
              radius={20}
              tilt={11}
              turn={-11}
              perspective={900}
              depth={82}
              speed={20}
              variance={0.22}
              parallax={0.38}
              lift={38}
              fade={0.78}
              dim={0.9}
              overlayColor="#07111d"
            />
          </div>
          <div className="intro-gateway__shade" aria-hidden="true" />
          <span className="intro-gateway__flare intro-gateway__flare--one" aria-hidden="true" />
          <span className="intro-gateway__flare intro-gateway__flare--two" aria-hidden="true" />

          <div className="intro-gateway__content">
            <div className="intro-gateway__panel">
              <p className="intro-gateway__eyebrow">Preparé algo para vos</p>

              <h1 className="intro-gateway__title">
                Bienvenida a tu
                <span>búsqueda del tesoro</span>
              </h1>

              <p className="intro-gateway__copy">
                Seguí las pistas, acercate a cada lugar y dejá que la aventura te sorprenda.
              </p>

              <div
                id="intro-schedule"
                className={`intro-gateway__schedule ${
                  unlock.configurationError
                    ? "intro-gateway__schedule--error"
                    : unlock.configured
                      ? "intro-gateway__schedule--locked"
                      : "intro-gateway__schedule--preview"
                }`}
                role="status"
                aria-live="polite"
              >
                <span>
                  <strong>
                    {unlock.configurationError
                      ? "Configuración pendiente"
                      : unlock.configured
                        ? unlock.unlocked
                          ? "La aventura ya está disponible"
                          : "Todavía falta un poquito"
                        : "Modo de prueba"}
                  </strong>
                  <small>{scheduleMessage}</small>
                  {unlock.configured && !unlock.unlocked && !unlock.configurationError ? (
                    <time
                      className="intro-gateway__countdown"
                      dateTime={projectConfig.intro.unlockAt}
                    >
                      {formatRemainingTime(unlock.remainingMs)}
                    </time>
                  ) : null}
                </span>
              </div>

              <button
                type="button"
                className="intro-gateway__unlock"
                aria-describedby="intro-schedule"
                disabled={!unlock.unlocked}
                onClick={finishIntro}
              >
                {unlock.unlocked ? "Desbloquear aventura" : "Acceso bloqueado"}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
