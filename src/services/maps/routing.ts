import type { Coordinates } from "../../types/location";
import type { NavigationRoute } from "../../types/route";

const ROUTING_URL = import.meta.env.VITE_ROUTING_URL?.replace(/\/$/, "");

/**
 * Contrato preparado para V0.4. El proveedor se configura por entorno para
 * que la UI no dependa directamente de OSRM, GraphHopper o Valhalla.
 */
export async function calculateRoute(
  origin: Coordinates,
  destination: Coordinates,
  signal?: AbortSignal,
): Promise<NavigationRoute> {
  if (!ROUTING_URL) {
    throw new Error("El proveedor de rutas se definirá en la fase V0.4.");
  }

  const url = new URL(`${ROUTING_URL}/route`);
  url.searchParams.set("origin", `${origin.latitude},${origin.longitude}`);
  url.searchParams.set("destination", `${destination.latitude},${destination.longitude}`);

  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("No pudimos calcular una ruta.");
  return response.json() as Promise<NavigationRoute>;
}
