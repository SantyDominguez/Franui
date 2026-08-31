import type { ReactNode } from "react";

type LoveMessageProps = {
  children: ReactNode;
  signature?: string;
};

export function LoveMessage({ children, signature }: LoveMessageProps) {
  return (
    <blockquote className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/72 p-6 shadow-[0_22px_70px_rgba(23,82,117,0.1)] backdrop-blur">
      <div className="font-display text-xl leading-8 text-ink">{children}</div>
      {signature && <footer className="mt-4 text-sm font-semibold text-primary">— {signature}</footer>}
    </blockquote>
  );
}
