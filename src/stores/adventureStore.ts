import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../lib/constants";

type AdventureState = {
  completedMissionIds: string[];
  revealedMissionIds: string[];
  activeMissionId: string | null;
  completeMission: (missionId: string) => void;
  revealMission: (missionId: string) => void;
  setActiveMission: (missionId: string) => void;
  resetProgress: () => void;
};

export const useAdventureStore = create<AdventureState>()(
  persist(
    (set) => ({
      completedMissionIds: [],
      revealedMissionIds: [],
      activeMissionId: "mission-01",
      completeMission: (missionId) =>
        set((state) => ({
          completedMissionIds: state.completedMissionIds.includes(missionId)
            ? state.completedMissionIds
            : [...state.completedMissionIds, missionId],
        })),
      revealMission: (missionId) =>
        set((state) => ({
          revealedMissionIds: state.revealedMissionIds.includes(missionId)
            ? state.revealedMissionIds
            : [...state.revealedMissionIds, missionId],
        })),
      setActiveMission: (activeMissionId) => set({ activeMissionId }),
      resetProgress: () =>
        set({ completedMissionIds: [], revealedMissionIds: [], activeMissionId: "mission-01" }),
    }),
    { name: STORAGE_KEYS.adventure, version: 2 },
  ),
);
