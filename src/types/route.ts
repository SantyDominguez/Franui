import type { Coordinates } from "./location";
import type { LineString } from "geojson";

export type RouteStep = {
  instruction: string;
  distance: number;
  duration: number;
  maneuver?: string;
  location?: Coordinates;
};

export type NavigationRoute = {
  distance: number;
  duration: number;
  geometry: LineString;
  steps: RouteStep[];
};
