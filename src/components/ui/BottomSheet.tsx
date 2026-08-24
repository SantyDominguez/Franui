import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type BottomSheetProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function BottomSheet({ children, className, label }: BottomSheetProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "rounded-t-[2rem] border border-b-0 border-white/70 bg-surface/95 px-5 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(69,35,47,0.12)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-line" aria-hidden="true" />
      {children}
    </section>
  );
}
