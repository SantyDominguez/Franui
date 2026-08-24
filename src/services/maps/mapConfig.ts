import type { StyleSpecification } from "maplibre-gl";

const customStyleUrl = import.meta.env.VITE_MAP_STYLE_URL?.trim();

const openStreetMapRasterStyle: StyleSpecification = {
  version: 8,
  name: "OpenStreetMap — demo",
  sources: {
    openStreetMap: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
    },
  },
  layers: [
    {
      id: "openStreetMap",
      type: "raster",
      source: "openStreetMap",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export function getMapStyle(): string | StyleSpecification {
  return customStyleUrl || openStreetMapRasterStyle;
}
