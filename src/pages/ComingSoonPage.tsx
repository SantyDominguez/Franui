import { Clock3, Sparkles } from "lucide-react";

type ComingSoonPageProps = {
  title: string;
  description: string;
  phase: string;
};

export function ComingSoonPage({ title, description, phase }: ComingSoonPageProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/65 p-7 text-center shadow-[0_24px_70px_rgba(23,82,117,0.1)]">
      <div className="absolute -right-10 -top-10 size-36 rounded-full bg-primary-soft blur-2xl" aria-hidden="true" />
      <span className="relative mx-auto grid size-16 place-items-center rounded-[1.6rem] bg-primary-soft text-primary">
        <Clock3 size={27} aria-hidden="true" />
      </span>
      <p className="relative mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
        <Sparkles size={14} /> Fase {phase}
      </p>
      <h1 className="relative mt-3 font-display text-3xl text-ink">{title}</h1>
      <p className="relative mx-auto mt-3 max-w-md text-pretty text-sm leading-6 text-muted">{description}</p>
    </section>
  );
}
