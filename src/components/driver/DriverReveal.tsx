import { useEffect, useRef, useState } from "react";

type DriverRevealProps = {
  carImage: string;
  driverImage?: string;
  onComplete: () => void;
};

type RevealStage = "announcement" | "portrait";

const ANNOUNCEMENT_DURATION_MS = 4_300;

export function DriverReveal({ carImage, driverImage, onComplete }: DriverRevealProps) {
  const [stage, setStage] = useState<RevealStage>("announcement");
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => setStage("portrait"),
      reduceMotion ? 700 : ANNOUNCEMENT_DURATION_MS,
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (stage !== "portrait") return;
    const frame = window.requestAnimationFrame(() => continueButtonRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  return (
    <div
      className={`driver-reveal driver-reveal--${stage}`}
      role="dialog"
      aria-modal="true"
      aria-label="Presentación de tu chofer"
    >
      {stage === "announcement" ? (
        <div className="driver-reveal__announcement">
          <p className="driver-reveal__small">Antes de salir</p>
          <h2 className="driver-reveal__title">
            <span>Tu chofer</span>
            <span>va a ser…</span>
          </h2>

          <div className="driver-reveal__road" aria-hidden="true">
            <span className="driver-reveal__road-line" />
            <img className="driver-reveal__car" src={carImage} alt="" draggable={false} />
          </div>
        </div>
      ) : (
        <div className="driver-reveal__portrait-stage">
          <p className="driver-reveal__small">Tu chofer va a ser</p>
          <div className="driver-reveal__portrait">
            {driverImage ? (
              <img src={driverImage} alt="Foto de tu chofer" />
            ) : (
              <div className="driver-reveal__portrait-placeholder">
                <strong>Tu foto va acá</strong>
                <span>Agregala desde projectConfig.ts</span>
              </div>
            )}
          </div>
          <button
            ref={continueButtonRef}
            type="button"
            className="driver-reveal__continue"
            onClick={onComplete}
          >
            Continuar la aventura
          </button>
        </div>
      )}
    </div>
  );
}
