import { CornerUpRight } from "lucide-react";
import type { RouteStep } from "../../types/route";

type NavigationPanelProps = {
  step?: RouteStep;
};

export function NavigationPanel({ step }: NavigationPanelProps) {
  return (
    <section className="rounded-[1.7rem] bg-primary p-5 text-white">
      <div className="flex items-start gap-4">
        <CornerUpRight className="mt-1 shrink-0" size={28} />
        <div>
          <p className="text-sm text-white/70">Próxima indicación</p>
          <p className="mt-1 font-display text-2xl">{step?.instruction || "Disponible en V0.4"}</p>
        </div>
      </div>
    </section>
  );
}
