import type { Coordinates, LocationError, UserLocation } from "../../types/location";

const EARTH_RADIUS_METRES = 6_371_000;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function distanceBetween(origin: Coordinates, destination: Coordinates) {
  const deltaLatitude = toRadians(destination.latitude - origin.latitude);
  const deltaLongitude = toRadians(destination.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);

  const haversine =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(deltaLongitude / 2) ** 2;

  return EARTH_RADIUS_METRES * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function positionToLocation(position: GeolocationPosition): UserLocation {
  const { coords, timestamp } = position;
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: coords.accuracy,
    altitude: coords.altitude,
    speed: coords.speed,
    heading: coords.heading,
    timestamp,
  };
}

export function geolocationErrorToLocationError(error: GeolocationPositionError): LocationError {
  if (error.code === error.PERMISSION_DENIED) {
    return {
      code: "permission-denied",
      message: "El permiso de ubicación está desactivado. Podés habilitarlo desde el navegador.",
    };
  }
  if (error.code === error.POSITION_UNAVAILABLE) {
    return {
      code: "position-unavailable",
      message: "El dispositivo todavía no pudo determinar tu ubicación.",
    };
  }
  if (error.code === error.TIMEOUT) {
    return {
      code: "timeout",
      message: "La ubicación tardó demasiado. Probá al aire libre o activá la ubicación precisa.",
    };
  }
  return { code: "unknown", message: "Ocurrió un error inesperado al obtener la ubicación." };
}

export function formatAccuracy(accuracy?: number | null) {
  if (!accuracy) return "Precisión desconocida";
  return `Precisión aproximada: ±${Math.round(accuracy)} m`;
}
