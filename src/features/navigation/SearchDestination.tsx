import { Search } from "lucide-react";
import { Input } from "../../components/ui/Input";

type SearchDestinationProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function SearchDestination({ value, onChange, disabled }: SearchDestinationProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={19} />
      <Input
        aria-label="Buscar destino"
        className="pl-11"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="¿A dónde querés ir?"
        disabled={disabled}
      />
    </div>
  );
}
