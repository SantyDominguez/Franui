import { calculateProgress } from "../../services/adventure/progressService";

type MissionProgressProps = {
  total: number;
  completed: number;
};

export function MissionProgress({ total, completed }: MissionProgressProps) {
  const progress = calculateProgress(total, completed);

  return (
    <section className="rounded-[1.7rem] border border-white/75 bg-white/70 p-5 shadow-sm" aria-label="Progreso de la aventura">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Nuestra aventura</p>
          <p className="mt-1 font-display text-2xl text-ink">
            {completed} de {total} pistas
          </p>
        </div>
        <span className="text-sm font-bold text-primary">{progress}%</span>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-primary-soft">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </section>
  );
}
