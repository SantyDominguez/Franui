import { useEffect } from "react";
import type { GeoJSONSource, Map as MapLibreMap } from "maplibre-gl";
import { createCircleFeature } from "../../features/location/locationUtils";
import type { ProximityLevel, SearchArea } from "../../types/mission";

type SearchAreaLayerProps = {
  map: MapLibreMap;
  area: SearchArea;
  level: ProximityLevel;
};

const SOURCE_ID = "mission-search-area";
const FILL_LAYER_ID = "mission-search-area-fill";
const OUTLINE_LAYER_ID = "mission-search-area-outline";

const colors: Record<ProximityLevel, string> = {
  locating: "#8d3154",
  "weak-signal": "#7a6f73",
  "very-cold": "#3979b8",
  cold: "#4f9fc8",
  warm: "#d79a45",
  hot: "#dc654d",
  "very-close": "#8d3154",
};

export function SearchAreaLayer({ map, area, level }: SearchAreaLayerProps) {
  useEffect(() => {
    const addArea = () => {
      const data = createCircleFeature(area.center, area.radius);
      const existingSource = map.getSource(SOURCE_ID) as GeoJSONSource | undefined;
      if (existingSource) {
        existingSource.setData(data);
        return;
      }

      map.addSource(SOURCE_ID, { type: "geojson", data });
      map.addLayer({
        id: FILL_LAYER_ID,
        type: "fill",
        source: SOURCE_ID,
        paint: {
          "fill-color": colors[level],
          "fill-opacity": 0.17,
        },
      });
      map.addLayer({
        id: OUTLINE_LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": colors[level],
          "line-width": 3,
          "line-opacity": 0.82,
          "line-dasharray": [2, 1.5],
        },
      });
    };

    if (map.isStyleLoaded()) addArea();
    else map.once("load", addArea);

    return () => {
      map.off("load", addArea);
      if (map.getLayer(OUTLINE_LAYER_ID)) map.removeLayer(OUTLINE_LAYER_ID);
      if (map.getLayer(FILL_LAYER_ID)) map.removeLayer(FILL_LAYER_ID);
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
    };
  }, [area, map]);

  useEffect(() => {
    if (map.getLayer(FILL_LAYER_ID)) {
      map.setPaintProperty(FILL_LAYER_ID, "fill-color", colors[level]);
    }
    if (map.getLayer(OUTLINE_LAYER_ID)) {
      map.setPaintProperty(OUTLINE_LAYER_ID, "line-color", colors[level]);
    }
  }, [level, map]);

  return null;
}
