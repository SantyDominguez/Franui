import { useCallback, useEffect, useRef } from "react";
import { GEOLOCATION_OPTIONS, GEOLOCATION_REFRESH_MS } from "../../lib/constants";
import { useLocationStore } from "./locationStore";
import { geolocationErrorToLocationError, positionToLocation } from "./locationUtils";

type UseGeolocationOptions = {
  autoStart?: boolean;
};

export function useGeolocation({ autoStart = false }: UseGeolocationOptions = {}) {
  const watchIdRef = useRef<number | null>(null);
  const refreshIdRef = useRef<number | null>(null);
  const isTrackingRef = useRef(false);
  const { status, location, error, setRequesting, setLocation, setError } = useLocationStore();

  const stopTracking = useCallback(() => {
    isTrackingRef.current = false;
    if (watchIdRef.current !== null && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (refreshIdRef.current !== null) {
      window.clearInterval(refreshIdRef.current);
      refreshIdRef.current = null;
    }
  }, []);

  const handlePosition = useCallback(
    (position: GeolocationPosition) => {
      if (!isTrackingRef.current) return;
      setLocation(positionToLocation(position));
    },
    [setLocation],
  );

  const handlePositionError = useCallback(
    (positionError: GeolocationPositionError) => {
      if (!isTrackingRef.current) return;
      const parsedError = geolocationErrorToLocationError(positionError);
      const hasPreviousLocation = useLocationStore.getState().location !== null;

      // Una pérdida temporal de señal no debe congelar ni apagar un detector
      // que ya tiene una posición válida. El watcher sigue esperando la próxima.
      if (hasPreviousLocation && parsedError.code !== "permission-denied") return;

      if (parsedError.code === "permission-denied") {
        isTrackingRef.current = false;
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        if (refreshIdRef.current !== null) {
          window.clearInterval(refreshIdRef.current);
          refreshIdRef.current = null;
        }
      }

      setError(
        parsedError,
        parsedError.code === "permission-denied" ? "denied" : "unavailable",
      );
    },
    [setError],
  );

  const requestFreshPosition = useCallback(() => {
    if (
      !isTrackingRef.current ||
      !("geolocation" in navigator) ||
      document.visibilityState !== "visible"
    ) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      handlePosition,
      handlePositionError,
      GEOLOCATION_OPTIONS,
    );
  }, [handlePosition, handlePositionError]);

  const startTracking = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError(
        { code: "unsupported", message: "Este navegador no ofrece geolocalización web." },
        "unavailable",
      );
      return;
    }

    stopTracking();
    isTrackingRef.current = true;
    if (useLocationStore.getState().location === null) setRequesting();
    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      handlePositionError,
      GEOLOCATION_OPTIONS,
    );
    requestFreshPosition();
    refreshIdRef.current = window.setInterval(requestFreshPosition, GEOLOCATION_REFRESH_MS);
  }, [handlePosition, handlePositionError, requestFreshPosition, setError, setRequesting, stopTracking]);

  useEffect(() => {
    if (!autoStart) return stopTracking;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") startTracking();
      else stopTracking();
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopTracking();
    };
  }, [autoStart, startTracking, stopTracking]);

  return { status, location, error, startTracking, stopTracking };
}
