import { Heart, LockKeyhole } from "lucide-react";
import type { Memory } from "../../types/memory";

type MemoryCardProps = {
  memory: Memory;
};

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-white/75 bg-white/70 shadow-[0_18px_50px_rgba(98,52,69,0.08)]">
      <div className="grid aspect-[4/3] place-items-center bg-primary-soft text-primary">
        {memory.isUnlocked ? <Heart className="fill-current" size={30} /> : <LockKeyhole size={28} />}
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {memory.isUnlocked ? memory.date || "Recuerdo" : "Bloqueado"}
        </p>
        <h3 className="mt-2 font-display text-2xl text-ink">{memory.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          {memory.isUnlocked ? memory.description : "Completá la misión indicada para descubrirlo."}
        </p>
      </div>
    </article>
  );
}
