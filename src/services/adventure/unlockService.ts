import { normalizeAnswer } from "../../lib/utils";
import type { Coordinates } from "../../types/location";
import type { Mission, UnlockCondition } from "../../types/mission";
import { distanceBetween } from "../../features/location/locationUtils";

type UnlockContext = {
  answer?: string;
  location?: Coordinates | null;
  completedMissionIds?: string[];
};

export function canUnlockMission(mission: Mission, context: UnlockContext) {
  const condition: UnlockCondition = mission.unlockCondition;

  switch (condition.type) {
    case "code":
      return normalizeAnswer(context.answer || "") === normalizeAnswer(condition.code);
    case "question": {
      const possibleAnswers = [condition.answer, ...(condition.acceptedAnswers || [])].map(normalizeAnswer);
      return possibleAnswers.includes(normalizeAnswer(context.answer || ""));
    }
    case "location":
      return context.location
        ? distanceBetween(context.location, condition.coordinates) <= condition.radius
        : false;
    case "previousMission":
      return Boolean(context.completedMissionIds?.includes(condition.requiredMissionId));
    case "manual":
      return false;
  }
}
