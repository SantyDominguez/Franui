import { useState, type FormEvent } from "react";
import { Heart } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

type QuestionChallengeProps = {
  prompt?: string;
  onSubmit: (value: string) => boolean;
};

export function QuestionChallenge({ prompt, onSubmit }: QuestionChallengeProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const isCorrect = onSubmit(answer);
    setError(isCorrect ? "" : "Todavía no… leé la pista una vez más 💗");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        name="mission-answer"
        label="Tu respuesta"
        hint={prompt}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        autoComplete="off"
        error={error}
        placeholder="Escribí lo que pensás…"
      />
      <Button type="submit" fullWidth disabled={!answer.trim()}>
        <Heart size={18} className="fill-current" /> Responder
      </Button>
    </form>
  );
}
