import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../lib/constants";

type Theme = "light" | "dark" | "system";

type SettingsState = {
  theme: Theme;
  reducedMotion: boolean;
  setTheme: (theme: Theme) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "light",
      reducedMotion: false,
      setTheme: (theme) => set({ theme }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
    }),
    { name: STORAGE_KEYS.settings },
  ),
);
