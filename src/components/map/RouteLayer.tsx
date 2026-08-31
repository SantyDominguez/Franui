import { useEffect } from "react";
import type { Feature, LineString } from "geojson";
import type { GeoJSONSource, Map as MapLibreMap } from "maplibre-gl";
import type { NavigationRoute } from "../../types/route";

type RouteLayerProps = {
  map: MapLibreMap;
  route: NavigationRoute | null;
};

const SOURCE_ID = "active-route-source";
const LAYER_ID = "active-route-layer";

export function RouteLayer({ map, route }: RouteLayerProps) {
  useEffect(() => {
    if (!route || !map.isStyleLoaded()) return;

    const data: Feature<LineString> = {
      type: "Feature",
      properties: {},
      geometry: route.geometry,
    };

    const existingSource = map.getSource(SOURCE_ID) as GeoJSONSource | undefined;
    if (existingSource) {
      existingSource.setData(data);
      return;
    }

    map.addSource(SOURCE_ID, { type: "geojson", data });
    map.addLayer({
      id: LAYER_ID,
      type: "line",
      source: SOURCE_ID,
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#176ea6",
        "line-width": 6,
        "line-opacity": 0.9,
      },
    });

    return () => {
      if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
    };
  }, [map, route]);

  return null;
}
