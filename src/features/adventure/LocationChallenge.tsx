import { MapPin } from "lucide-react";
import { Button } from "../../components/ui/Button";

type LocationChallengeProps = {
  onCheck: () => void;
  disabled?: boolean;
};

export function LocationChallenge({ onCheck, disabled }: LocationChallengeProps) {
  return (
    <div className="rounded-2xl bg-primary-soft p-5 text-center">
      <MapPin className="mx-auto text-primary" size={28} />
      <p className="mt-3 text-sm leading-6 text-muted">
        La comprobación por radio GPS se conectará en V0.3. El cálculo de distancia ya está preparado.
      </p>
      <Button className="mt-4" onClick={onCheck} disabled={disabled}>
        Comprobar ubicación
      </Button>
    </div>
  );
}
