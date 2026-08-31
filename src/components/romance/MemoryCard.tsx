import { Heart, LockKeyhole } from "lucide-react";
import type { Memory } from "../../types/memory";

type MemoryCardProps = {
  memory: Memory;
};

export function MemoryCard({ memory }: MemoryCardProps) {
  const imageSrc = memory.image
    ? `${import.meta.env.BASE_URL}${memory.image}`
    : null;

  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-white/75 bg-white/70 shadow-[0_18px_50px_rgba(120,47,88,0.12)]">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-primary-soft text-primary">
        {memory.isUnlocked && imageSrc ? (
          <img
            src={imageSrc}
            alt={memory.title}
            className="h-full w-full object-cover"
          />
        ) : memory.isUnlocked ? (
          <Heart className="fill-current" size={30} />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-slate-100 to-pink-100">
            <LockKeyhole size={30} />
          </div>
        )}

        {!memory.isUnlocked && (
          <div className="absolute inset-0 bg-white/45 backdrop-blur-[3px]" />
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {memory.isUnlocked ? memory.date || "Recuerdo" : "Bloqueado"}
        </p>

        <h3 className="mt-2 font-display text-2xl text-ink">{memory.title}</h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          {memory.isUnlocked
            ? memory.description
            : "Completá la pista correspondiente para descubrir este recuerdo."}
        </p>
      </div>
    </article>
  );
}
