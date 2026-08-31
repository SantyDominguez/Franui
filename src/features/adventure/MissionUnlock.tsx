import { CheckCircle2, Map } from "lucide-react";
import { Link } from "react-router-dom";
import type { Mission } from "../../types/mission";
import { canUnlockMission } from "../../services/adventure/unlockService";
import { CodeChallenge } from "./CodeChallenge";
import { MemoryChallenge } from "./MemoryChallenge";
import { QuestionChallenge } from "./QuestionChallenge";

type MissionUnlockProps = {
  mission: Mission;
  completed: boolean;
  onComplete: () => void;
};

export function MissionUnlock({ mission, completed, onComplete }: MissionUnlockProps) {
  const submitAnswer = (answer: string) => {
    const correct = canUnlockMission(mission, { answer });
    if (correct) onComplete();
    return correct;
  };

  if (completed) {
    return (
      <div className="rounded-[1.7rem] border border-success/20 bg-success-soft p-5 text-center">
        <CheckCircle2 className="mx-auto text-success" size={31} aria-hidden="true" />
        <h3 className="mt-3 font-display text-2xl text-ink">{mission.content.rewardTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{mission.content.rewardMessage}</p>
      </div>
    );
  }

  if (mission.type === "code") return <CodeChallenge onSubmit={submitAnswer} />;
  if (mission.type === "question") {
    return <QuestionChallenge prompt={mission.content.prompt} onSubmit={submitAnswer} />;
  }
  if (mission.type === "gps" || mission.type === "geofence") {
    return (
      <div className="rounded-[1.7rem] border border-primary/15 bg-primary-soft/70 p-5 text-center">
        <p className="text-sm leading-6 text-muted">Llegá al punto final y el GPS hará el resto.</p>
        <Link
          to="/map"
          className="button-luminous mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-sm font-semibold"
        >
          <Map size={18} /> Abrir mapa y seguir la señal
        </Link>
      </div>
    );
  }
  if (mission.type === "photo") return <MemoryChallenge />;

  return (
    <p className="rounded-2xl bg-primary-soft p-5 text-sm leading-6 text-muted">
      Esta misión requiere validación manual y se conectará en una fase posterior.
    </p>
  );
}
