import { missions } from "../../data/missions";
import type { Mission, MissionStatus } from "../../types/mission";

export function getMissions() {
  return missions;
}

export function getMissionById(id: string) {
  return missions.find((mission) => mission.id === id);
}

export function getMissionStatus(mission: Mission, completedMissionIds: string[]): MissionStatus {
  if (completedMissionIds.includes(mission.id)) return "completed";
  if (mission.order === 1) return "available";

  const previousMission = missions.find((item) => item.order === mission.order - 1);
  return previousMission && completedMissionIds.includes(previousMission.id) ? "available" : "locked";
}

export function getFirstAvailableMission(completedMissionIds: string[]) {
  return missions.find((mission) => getMissionStatus(mission, completedMissionIds) === "available");
}

export function getNextMission(mission: Mission) {
  return missions.find((item) => item.order === mission.order + 1);
}
