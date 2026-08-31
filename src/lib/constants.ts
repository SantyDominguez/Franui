export const MAP_DEFAULT_ZOOM = 13;
export const MAP_USER_ZOOM = 16.5;
export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20_000,
  maximumAge: 0,
};

export const GEOLOCATION_REFRESH_MS = 4_000;

export const STORAGE_KEYS = {
  adventure: "our-platform:adventure",
  settings: "our-platform:settings",
} as const;
