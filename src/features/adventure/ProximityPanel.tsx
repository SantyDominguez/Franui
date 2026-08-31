import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CloudSun,
  Flame,
  Radio,
  Snowflake,
  Sparkles,
  ThermometerSun,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "../../components/ui/Button";
import type { ProximityDescriptor } from "../../services/adventure/proximityService";
import type { Mission } from "../../types/mission";
import { CodeChallenge } from "./CodeChallenge";

type ProximityPanelProps = {
  mission: Mission;
  descriptor: ProximityDescriptor;
  completed: boolean;
  hasNextMission: boolean;
  onSubmitCode: (code: string) => boolean;
  onContinue: () => void;
};

const iconByLevel = {
  locating: Radio,
  "weak-signal": Radio,
  "very-cold": Snowflake,
  cold: Snowflake,
  warm: CloudSun,
  hot: Flame,
  "very-close": Flame,
};

const toneByLevel = {
  locating: "border-white/75 bg-white/95 text-primary",
  "weak-signal": "border-line bg-white/95 text-muted",
  "very-cold": "border-[#9cc9ee] bg-[#edf7ff]/96 text-[#286895]",
  cold: "border-[#9ed7e9] bg-[#eefbff]/96 text-[#287999]",
  warm: "border-[#f0cf94] bg-[#fff9e9]/97 text-[#9b6720]",
  hot: "border-[#efad9d] bg-[#fff2ee]/97 text-[#b94f39]",
  "very-close": "border-[#d85f79]/35 bg-[#fff0f3]/97 text-[#a83d59]",
};

export function ProximityPanel({
  mission,
  descriptor,
  completed,
  hasNextMission,
  onSubmitCode,
  onContinue,
}: ProximityPanelProps) {
  const panelId = useId();
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches,
  );
  const Icon = iconByLevel[descriptor.level];
  const message =
    descriptor.level === "very-close" && mission.content.arrivalMessage
      ? mission.content.arrivalMessage
      : descriptor.message;

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    setCollapsed(isMobile);
  }, [mission.id]);

  useEffect(() => {
    if (completed || descriptor.level === "very-close") {
      setCollapsed(false);
    }
  }, [completed, descriptor.level]);

  if (completed) {
    return (
      <section className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] border border-b-0 border-success/25 bg-success-soft/97 p-5 pb-6 text-center shadow-[0_-18px_55px_rgba(23,76,108,0.16)] backdrop-blur-xl">
        <CheckCircle2 className="mx-auto text-success" size={34} aria-hidden="true" />
        <h2 className="mt-3 font-display text-3xl text-ink">
          {mission.content.rewardTitle || "Código correcto"}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          {mission.content.rewardMessage || "Esta misión quedó completada."}
        </p>
        <Button className="mt-4" fullWidth onClick={onContinue}>
          <Sparkles size={18} /> {hasNextMission ? "Descubrir la siguiente pista" : "Ver el final"}
        </Button>
      </section>
    );
  }

  if (collapsed) {
    return (
      <section
        className={`absolute inset-x-0 bottom-0 z-20 rounded-t-[1.6rem] border border-b-0 px-4 pb-3 pt-2 shadow-[0_-12px_40px_rgba(23,76,108,0.15)] backdrop-blur-xl ${toneByLevel[descriptor.level]}`}
        aria-live="polite"
        aria-label={`Cercanía: ${descriptor.label}`}
      >
        <button
          type="button"
          className="flex min-h-16 w-full items-center gap-3 rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-current/35"
          aria-expanded="false"
          aria-label={`Abrir panel de frío y calor. Estado actual: ${descriptor.label}`}
          onClick={() => setCollapsed(false)}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/75 shadow-sm">
            <Icon
              size={21}
              className={descriptor.level === "hot" ? "animate-pulse" : ""}
              aria-hidden="true"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-current/65">
              Pista {String(mission.order).padStart(2, "0")} · <span className="live-signal-dot mr-1" /> Detector en vivo
            </span>
            <span className="mt-0.5 block truncate font-display text-2xl leading-none text-current">
              {descriptor.label}
            </span>
          </span>
          <span className="flex shrink-0 flex-col items-center gap-0.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] text-current/65">
            <ChevronUp size={20} aria-hidden="true" />
            Abrir
          </span>
        </button>

        <div className="h-1.5 overflow-hidden rounded-full bg-current/10" aria-hidden="true">
          <span
            className="block h-full rounded-full bg-current/55 transition-[width] duration-700"
            style={{ width: `${Math.max(3, descriptor.progress)}%` }}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id={panelId}
      className={`absolute inset-x-0 bottom-0 z-20 max-h-[58%] overflow-y-auto rounded-t-[2rem] border border-b-0 px-5 pb-6 pt-2 shadow-[0_-18px_55px_rgba(23,76,108,0.16)] backdrop-blur-xl sm:max-h-[52%] sm:pt-5 ${toneByLevel[descriptor.level]}`}
      aria-live="polite"
      aria-label={`Cercanía: ${descriptor.label}`}
    >
      <button
        type="button"
        className="mx-auto mb-3 flex min-h-8 items-center gap-2 rounded-full px-3 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-current/65 outline-none focus-visible:ring-2 focus-visible:ring-current/35 sm:hidden"
        aria-expanded="true"
        aria-label="Minimizar panel de frío y calor"
        onClick={() => setCollapsed(true)}
      >
        <span className="h-1 w-10 rounded-full bg-current/20" aria-hidden="true" />
        Minimizar
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/75 shadow-sm">
          <Icon
            size={24}
            className={descriptor.level === "hot" || descriptor.level === "very-close" ? "animate-pulse" : ""}
            fill={descriptor.level === "very-close" ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-current/70">
            <span>Pista {String(mission.order).padStart(2, "0")}</span>
            <span className="inline-flex items-center gap-1.5"><span className="live-signal-dot" /> Detector en vivo</span>
          </p>
          <h2 className="mt-1 font-display text-3xl leading-none text-current">{descriptor.label}</h2>
          <p className="mt-2 text-sm leading-5 text-ink/70">{message}</p>
        </div>
      </div>

      <div className="mt-4" aria-label={`Indicador de cercanía ${descriptor.progress}%`}>
        <div className="relative h-2.5 overflow-hidden rounded-full bg-[linear-gradient(90deg,#4f9fc8_0%,#56bdd0_30%,#f0c46a_56%,#dc654d_80%,#8d3154_100%)]">
          <span
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-md transition-[left] duration-700"
            style={{ left: `${Math.max(2, descriptor.progress)}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[0.62rem] font-bold uppercase tracking-[0.12em] text-current/60">
          <span>Frío</span>
          <span className="inline-flex items-center gap-1"><ThermometerSun size={11} /> Calor</span>
        </div>
      </div>

      <div className="mt-4 border-t border-current/10 pt-4 text-ink">
        <p className="mb-3 text-sm font-medium leading-5 text-muted">
          {mission.content.codePrompt || "Ingresá el código que te entregue la persona."}
        </p>
        <CodeChallenge key={mission.id} onSubmit={onSubmitCode} />
      </div>
    </section>
  );
}
