import { useEffect, useMemo, useRef, useState } from "react";
import { getProximityDescriptor, getProximityLevel } from "../../services/adventure/proximityService";
import type { SearchArea } from "../../types/mission";
import type { UserLocation } from "../../types/location";
import { distanceBetween } from "./locationUtils";

export function useProximity(location: UserLocation | null, area?: SearchArea, resetKey?: string) {
  const distance = useMemo(
    () => (location && area ? distanceBetween(location, area.center) : null),
    [area, location],
  );
  const candidate = area
    ? getProximityLevel(distance, location?.accuracy, area)
    : "locating";
  const [stableLevel, setStableLevel] = useState(candidate);
  const pendingRef = useRef({ level: candidate, readings: 0 });

  useEffect(() => {
    setStableLevel(candidate);
    pendingRef.current = { level: candidate, readings: 0 };
    // resetKey identifica un cambio de misión, no una lectura GPS.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    if (candidate === "locating" || candidate === "weak-signal" || stableLevel === "locating") {
      setStableLevel(candidate);
      pendingRef.current = { level: candidate, readings: 0 };
      return;
    }
    if (candidate === stableLevel) {
      pendingRef.current = { level: candidate, readings: 0 };
      return;
    }
    if (pendingRef.current.level !== candidate) {
      pendingRef.current = { level: candidate, readings: 1 };
      return;
    }
    pendingRef.current.readings += 1;
    if (pendingRef.current.readings >= 2) {
      setStableLevel(candidate);
      pendingRef.current = { level: candidate, readings: 0 };
    }
  }, [candidate, stableLevel]);

  return {
    distance,
    level: stableLevel,
    descriptor: getProximityDescriptor(stableLevel),
  };
}
