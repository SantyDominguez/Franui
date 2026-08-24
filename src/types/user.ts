export type UserPreferences = {
  theme: "light" | "dark" | "system";
  reducedMotion: boolean;
};

export type User = {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
  role?: "guest" | "creator";
  preferences?: UserPreferences;
  favoritePlaces?: string[];
};
