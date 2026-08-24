import { Check, LockKeyhole, Sparkles } from "lucide-react";
import type { Mission, MissionStatus } from "../../types/mission";
import { cn } from "../../lib/utils";

type MissionCardProps = {
  mission: Mission;
  status: MissionStatus;
};

const iconByStatus = {
  locked: LockKeyhole,
  available: Sparkles,
  completed: Check,
};

export function MissionCard({ mission, status }: MissionCardProps) {
  const Icon = iconByStatus[status];

  return (
    <article
      className={cn(
        "flex items-center gap-4 rounded-2xl border p-4 transition",
        status === "locked" && "border-line bg-white/45 text-muted",
        status === "available" && "border-primary/20 bg-white/85 text-ink shadow-lg shadow-primary/5",
        status === "completed" && "border-success/20 bg-success-soft text-ink",
      )}
    >
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-2xl",
          status === "locked" && "bg-line/70",
          status === "available" && "bg-primary-soft text-primary",
          status === "completed" && "bg-success text-white",
        )}
      >
        <Icon size={19} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.17em] text-current/65">
          Pista {String(mission.order).padStart(2, "0")}
        </p>
        <h3 className="mt-1 truncate font-display text-xl">{mission.title}</h3>
        <p className="mt-1 text-sm leading-5 text-current/70">{mission.description}</p>
      </div>
    </article>
  );
}
