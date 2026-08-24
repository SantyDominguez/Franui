import { create } from "zustand";
import { projectConfig } from "../data/projectConfig";
import type { User } from "../types/user";

type UserState = {
  user: User;
  setName: (name: string) => void;
  setAvatar: (avatar?: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "local-user",
    name: projectConfig.recipientName,
    avatar: projectConfig.avatarImage || undefined,
    role: "guest",
  },
  setName: (name) => set((state) => ({ user: { ...state.user, name } })),
  setAvatar: (avatar) => set((state) => ({ user: { ...state.user, avatar } })),
}));
