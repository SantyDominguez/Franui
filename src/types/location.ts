export type LocationStatus =
  | "idle"
  | "requesting"
  | "available"
  | "denied"
  | "unavailable"
  | "error";

export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  speed?: number | null;
  heading?: number | null;
  timestamp: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type LocationError = {
  code: "permission-denied" | "position-unavailable" | "timeout" | "unsupported" | "unknown";
  message: string;
};
