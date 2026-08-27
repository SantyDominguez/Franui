import { useMemo } from "react";
import { getProximityDescriptor, getProximityLevel } from "../../services/adventure/proximityService";
import type { SearchArea } from "../../types/mission";
import type { UserLocation } from "../../types/location";
import { distanceBetween } from "./locationUtils";

export function useProximity(location: UserLocation | null, area?: SearchArea) {
  const distance = useMemo(
    () => (location && area ? distanceBetween(location, area.center) : null),
    [area, location],
  );
  const level = area
    ? getProximityLevel(distance, location?.accuracy, area)
    : "locating";

  return {
    distance,
    level,
    descriptor: getProximityDescriptor(level),
  };
}
