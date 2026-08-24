import { Quote } from "lucide-react";
import type { ReactNode } from "react";

type LoveMessageProps = {
  children: ReactNode;
  signature?: string;
};

export function LoveMessage({ children, signature }: LoveMessageProps) {
  return (
    <blockquote className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/72 p-6 shadow-[0_22px_70px_rgba(98,52,69,0.08)] backdrop-blur">
      <Quote className="mb-4 text-primary/40" size={28} aria-hidden="true" />
      <div className="font-display text-xl leading-8 text-ink">{children}</div>
      {signature && <footer className="mt-4 text-sm font-semibold text-primary">— {signature}</footer>}
    </blockquote>
  );
}
