import { useCallback, useEffect, useRef } from "react";
import { GEOLOCATION_OPTIONS } from "../../lib/constants";
import { useLocationStore } from "./locationStore";
import { geolocationErrorToLocationError, positionToLocation } from "./locationUtils";

type UseGeolocationOptions = {
  autoStart?: boolean;
};

export function useGeolocation({ autoStart = false }: UseGeolocationOptions = {}) {
  const watchIdRef = useRef<number | null>(null);
  const { status, location, error, setRequesting, setLocation, setError } = useLocationStore();

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const startTracking = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError(
        { code: "unsupported", message: "Este navegador no ofrece geolocalización web." },
        "unavailable",
      );
      return;
    }

    stopTracking();
    setRequesting();
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => setLocation(positionToLocation(position)),
      (positionError) => {
        const parsedError = geolocationErrorToLocationError(positionError);
        setError(
          parsedError,
          parsedError.code === "permission-denied" ? "denied" : "unavailable",
        );
      },
      GEOLOCATION_OPTIONS,
    );
  }, [setError, setLocation, setRequesting, stopTracking]);

  useEffect(() => {
    if (autoStart) startTracking();
    return stopTracking;
  }, [autoStart, startTracking, stopTracking]);

  return { status, location, error, startTracking, stopTracking };
}
