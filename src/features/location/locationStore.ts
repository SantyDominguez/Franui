import { create } from "zustand";
import type { LocationError, LocationStatus, UserLocation } from "../../types/location";

type LocationState = {
  status: LocationStatus;
  location: UserLocation | null;
  error: LocationError | null;
  setRequesting: () => void;
  setLocation: (location: UserLocation) => void;
  setError: (error: LocationError, status?: LocationStatus) => void;
  reset: () => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  status: "idle",
  location: null,
  error: null,
  setRequesting: () => set({ status: "requesting", error: null }),
  setLocation: (location) => set({ status: "available", location, error: null }),
  setError: (error, status = "error") => set({ status, error }),
  reset: () => set({ status: "idle", location: null, error: null }),
}));
