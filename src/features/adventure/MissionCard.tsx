import { Check, LockKeyhole, Sparkles } from "lucide-react";
import type { Mission, MissionStatus } from "../../types/mission";
import { cn } from "../../lib/utils";

type MissionCardProps = {
  mission: Mission;
  status: MissionStatus;
  selected?: boolean;
  onSelect?: () => void;
};

const iconByStatus = {
  locked: LockKeyhole,
  available: Sparkles,
  completed: Check,
};

export function MissionCard({ mission, status, selected = false, onSelect }: MissionCardProps) {
  const Icon = iconByStatus[status];

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={status === "locked"}
      aria-current={selected ? "step" : undefined}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed",
        status === "locked" && "border-line bg-white/45 text-muted",
        status === "available" && "border-primary/20 bg-white/85 text-ink shadow-lg shadow-primary/5",
        status === "completed" && "border-success/20 bg-success-soft text-ink",
        selected && status !== "locked" && "ring-2 ring-primary/35",
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
    </button>
  );
}
