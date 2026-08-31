import { Heart, Sparkles } from "lucide-react";

type LoveHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function LoveHeader({ eyebrow, title, description }: LoveHeaderProps) {
  return (
    <header className="text-center">
      <span className="mx-auto mb-5 grid size-14 place-items-center rounded-[1.4rem] border border-white/80 bg-white/70 text-primary shadow-lg shadow-primary/10 backdrop-blur">
        <Heart className="fill-current" size={24} aria-hidden="true" />
      </span>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
          <Sparkles size={14} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h1 className="text-balance font-display text-4xl leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
        {title}
      </h1>
      {description && <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-7 text-muted">{description}</p>}
    </header>
  );
}
