import { Camera } from "lucide-react";

export function MemoryChallenge() {
  return (
    <div className="rounded-2xl border border-dashed border-primary/30 bg-white/55 p-6 text-center">
      <Camera className="mx-auto text-primary" size={28} />
      <p className="mt-3 text-sm leading-6 text-muted">
        Este tipo de desafío queda preparado para una foto o recuerdo en V0.5.
      </p>
    </div>
  );
}
