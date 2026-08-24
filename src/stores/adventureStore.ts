import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../lib/constants";

type AdventureState = {
  completedMissionIds: string[];
  introSeen: boolean;
  completeMission: (missionId: string) => void;
  markIntroSeen: () => void;
  resetProgress: () => void;
};

export const useAdventureStore = create<AdventureState>()(
  persist(
    (set) => ({
      completedMissionIds: [],
      introSeen: false,
      completeMission: (missionId) =>
        set((state) => ({
          completedMissionIds: state.completedMissionIds.includes(missionId)
            ? state.completedMissionIds
            : [...state.completedMissionIds, missionId],
        })),
      markIntroSeen: () => set({ introSeen: true }),
      resetProgress: () => set({ completedMissionIds: [], introSeen: false }),
    }),
    { name: STORAGE_KEYS.adventure },
  ),
);
