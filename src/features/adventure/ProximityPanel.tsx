import {
  CheckCircle2,
  CloudSun,
  Flame,
  Heart,
  Radio,
  Snowflake,
  Sparkles,
  ThermometerSun,
} from "lucide-react";
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
  "very-close": Heart,
};

const toneByLevel = {
  locating: "border-white/75 bg-white/95 text-primary",
  "weak-signal": "border-line bg-white/95 text-muted",
  "very-cold": "border-[#9cc9ee] bg-[#edf7ff]/95 text-[#286895]",
  cold: "border-[#9ed7e9] bg-[#eefbff]/95 text-[#287999]",
  warm: "border-[#f0cf94] bg-[#fff9e9]/95 text-[#9b6720]",
  hot: "border-[#efad9d] bg-[#fff2ee]/95 text-[#b94f39]",
  "very-close": "border-primary/25 bg-[#fff3f6]/97 text-primary",
};

export function ProximityPanel({
  mission,
  descriptor,
  completed,
  hasNextMission,
  onSubmitCode,
  onContinue,
}: ProximityPanelProps) {
  const Icon = iconByLevel[descriptor.level];
  const message =
    descriptor.level === "very-close" && mission.content.arrivalMessage
      ? mission.content.arrivalMessage
      : descriptor.message;

  if (completed) {
    return (
      <section className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] border border-b-0 border-success/25 bg-success-soft/97 p-5 pb-6 text-center shadow-[0_-18px_55px_rgba(57,39,45,0.16)] backdrop-blur-xl">
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

  return (
    <section
      className={`absolute inset-x-0 bottom-0 z-20 max-h-[52%] overflow-y-auto rounded-t-[2rem] border border-b-0 p-5 pb-6 shadow-[0_-18px_55px_rgba(57,39,45,0.16)] backdrop-blur-xl ${toneByLevel[descriptor.level]}`}
      aria-live="polite"
      aria-label={`Cercanía: ${descriptor.label}`}
    >
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-current/15" aria-hidden="true" />
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
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-current/70">
            Pista {String(mission.order).padStart(2, "0")}
          </p>
          <h2 className="mt-1 font-display text-3xl leading-none text-current">{descriptor.label}</h2>
          <p className="mt-2 text-sm leading-5 text-ink/70">{message}</p>
        </div>
      </div>

      <div className="mt-4" aria-label={`Indicador de cercanía ${descriptor.progress}%`}>
        <div className="relative h-2.5 overflow-hidden rounded-full bg-[linear-gradient(90deg,#4f9fc8_0%,#f0c46a_52%,#dc654d_78%,#8d3154_100%)]">
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
