import { create } from "zustand";
import type { GeocodingResult } from "../types/place";
import type { NavigationRoute } from "../types/route";

type MapState = {
  selectedDestination: GeocodingResult | null;
  route: NavigationRoute | null;
  isNavigating: boolean;
  mapStyle: "romantic" | "standard";
  setDestination: (destination: GeocodingResult | null) => void;
  setRoute: (route: NavigationRoute | null) => void;
  setNavigating: (isNavigating: boolean) => void;
};

export const useMapStore = create<MapState>((set) => ({
  selectedDestination: null,
  route: null,
  isNavigating: false,
  mapStyle: "romantic",
  setDestination: (selectedDestination) => set({ selectedDestination }),
  setRoute: (route) => set({ route }),
  setNavigating: (isNavigating) => set({ isNavigating }),
}));
