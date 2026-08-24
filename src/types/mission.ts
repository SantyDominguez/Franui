import type { Coordinates } from "./location";

export type MissionType = "code" | "gps" | "geofence" | "question" | "photo" | "manual";

export type MissionStatus = "locked" | "available" | "completed";

export type UnlockCondition =
  | { type: "code"; code: string }
  | { type: "location"; coordinates: Coordinates; radius: number }
  | { type: "question"; answer: string; acceptedAnswers?: string[] }
  | { type: "previousMission"; requiredMissionId: string }
  | { type: "manual" };

export type MissionContent = {
  eyebrow?: string;
  clue: string;
  prompt?: string;
  image?: string;
  rewardTitle?: string;
  rewardMessage?: string;
};

export type Mission = {
  id: string;
  order: number;
  title: string;
  description: string;
  type: MissionType;
  status: MissionStatus;
  unlockCondition: UnlockCondition;
  content: MissionContent;
};
