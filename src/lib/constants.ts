export const MAP_DEFAULT_ZOOM = 13;
export const MAP_USER_ZOOM = 16.5;
export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 15_000,
  maximumAge: 5_000,
};

export const STORAGE_KEYS = {
  adventure: "our-platform:adventure",
  settings: "our-platform:settings",
} as const;
