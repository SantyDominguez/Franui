import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../lib/constants";

type AnimationKind = "completion" | "arrival";
type ActiveAnimation = { kind: AnimationKind; missionId: string };

type AdventureState = {
  completedMissionIds: string[];
  revealedMissionIds: string[];
  activeMissionId: string | null;
  playedAnimationKeys: string[];
  animationQueue: ActiveAnimation[];
  activeAnimation: ActiveAnimation | null;
  completeMission: (missionId: string) => void;
  revealMission: (missionId: string) => void;
  setActiveMission: (missionId: string) => void;
  queueAnimation: (kind: AnimationKind, missionId: string) => void;
  closeAnimation: () => void;
  resetProgress: () => void;
};

const animationKey = (kind: AnimationKind, missionId: string) => `${kind}:${missionId}`;

export const useAdventureStore = create<AdventureState>()(
  persist(
    (set) => ({
      completedMissionIds: [],
      revealedMissionIds: [],
      activeMissionId: "mission-01",
      playedAnimationKeys: [],
      animationQueue: [],
      activeAnimation: null,
      completeMission: (missionId) =>
        set((state) => {
          if (state.completedMissionIds.includes(missionId)) return state;
          const completionKey = animationKey("completion", missionId);
          const completion = { kind: "completion" as const, missionId };
          const queue = [...state.animationQueue, completion];
          return {
            completedMissionIds: [...state.completedMissionIds, missionId],
            playedAnimationKeys: state.playedAnimationKeys.includes(completionKey)
              ? state.playedAnimationKeys
              : [...state.playedAnimationKeys, completionKey],
            animationQueue: queue,
            activeAnimation: state.activeAnimation || queue[0],
          };
        }),
      revealMission: (missionId) =>
        set((state) => ({
          revealedMissionIds: state.revealedMissionIds.includes(missionId)
            ? state.revealedMissionIds
            : [...state.revealedMissionIds, missionId],
        })),
      setActiveMission: (activeMissionId) => set({ activeMissionId }),
      queueAnimation: (kind, missionId) =>
        set((state) => {
          const key = animationKey(kind, missionId);
          if (state.playedAnimationKeys.includes(key)) return state;
          const animation = { kind, missionId } as ActiveAnimation;
          const queue = [...state.animationQueue, animation];
          return {
            playedAnimationKeys: [...state.playedAnimationKeys, key],
            animationQueue: queue,
            activeAnimation: state.activeAnimation || queue[0],
          };
        }),
      closeAnimation: () =>
        set((state) => {
          const [, ...remaining] = state.animationQueue;
          return {
            animationQueue: remaining,
            activeAnimation: remaining[0] || null,
          };
        }),
      resetProgress: () =>
        set({
          completedMissionIds: [],
          revealedMissionIds: [],
          activeMissionId: "mission-01",
          playedAnimationKeys: [],
          animationQueue: [],
          activeAnimation: null,
        }),
    }),
    { name: STORAGE_KEYS.adventure, version: 4 },
  ),
);
