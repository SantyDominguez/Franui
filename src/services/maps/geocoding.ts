import type { GeocodingResult } from "../../types/place";

const GEOCODING_URL = import.meta.env.VITE_GEOCODING_URL?.replace(/\/$/, "");

type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  name?: string;
  display_name: string;
  type?: string;
};

export function parseCoordinates(query: string): GeocodingResult | null {
  const match = query.trim().match(/^(-?\d{1,2}(?:\.\d+)?)[,\s]+(-?\d{1,3}(?:\.\d+)?)$/);
  if (!match) return null;

  const latitude = Number(match[1]);
  const longitude = Number(match[2]);
  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return null;

  return {
    id: `coordinates-${latitude}-${longitude}`,
    name: "Coordenadas",
    displayName: `${latitude}, ${longitude}`,
    latitude,
    longitude,
    category: "coordinates",
  };
}

/** Preparado para V0.2. No se invoca desde la interfaz de V0.1. */
export async function searchAddress(query: string, signal?: AbortSignal): Promise<GeocodingResult[]> {
  const coordinates = parseCoordinates(query);
  if (coordinates) return [coordinates];
  if (!GEOCODING_URL || query.trim().length < 3) return [];

  const url = new URL(`${GEOCODING_URL}/search`);
  url.searchParams.set("q", query.trim());
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("No pudimos buscar ese destino.");

  const results = (await response.json()) as NominatimResult[];
  return results.map((result) => ({
    id: String(result.place_id),
    name: result.name || result.display_name.split(",")[0],
    displayName: result.display_name,
    latitude: Number(result.lat),
    longitude: Number(result.lon),
    category: result.type,
  }));
}
