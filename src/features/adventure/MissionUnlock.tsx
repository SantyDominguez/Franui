import { CheckCircle2 } from "lucide-react";
import type { Mission } from "../../types/mission";
import { canUnlockMission } from "../../services/adventure/unlockService";
import { CodeChallenge } from "./CodeChallenge";
import { LocationChallenge } from "./LocationChallenge";
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
    return <LocationChallenge onCheck={() => undefined} disabled />;
  }
  if (mission.type === "photo") return <MemoryChallenge />;

  return (
    <p className="rounded-2xl bg-primary-soft p-5 text-sm leading-6 text-muted">
      Esta misión requiere validación manual y se conectará en una fase posterior.
    </p>
  );
}
