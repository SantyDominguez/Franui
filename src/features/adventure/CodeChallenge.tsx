import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

type CodeChallengeProps = {
  onSubmit: (value: string) => boolean;
};

export function CodeChallenge({ onSubmit }: CodeChallengeProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError(onSubmit(value) ? "" : "Ese código todavía no abre esta pista.");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        name="mission-code"
        label="Código secreto"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoComplete="off"
        spellCheck={false}
        error={error}
        placeholder="_ _ _ _ _ _"
      />
      <Button type="submit" fullWidth disabled={!value.trim()}>
        <KeyRound size={18} /> Comprobar código
      </Button>
    </form>
  );
}
