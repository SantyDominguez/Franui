import { LocateFixed, Minus, Plus } from "lucide-react";
import type { Map as MapLibreMap } from "maplibre-gl";
import { Button } from "../ui/Button";
import type { UserLocation } from "../../types/location";

type MapControlsProps = {
  map: MapLibreMap;
  location: UserLocation | null;
  onRequestLocation: () => void;
};

export function MapControls({ map, location, onRequestLocation }: MapControlsProps) {
  const centerOnUser = () => {
    if (!location) {
      onRequestLocation();
      return;
    }
    map.easeTo({
      center: [location.longitude, location.latitude],
      zoom: Math.max(map.getZoom(), 16.5),
      duration: 900,
    });
  };

  return (
    <div className="absolute right-4 top-28 z-10 flex flex-col gap-2" aria-label="Controles del mapa">
      <div className="overflow-hidden rounded-2xl border border-white/75 bg-white/92 shadow-xl backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none border-b border-line"
          onClick={() => map.zoomIn({ duration: 250 })}
          aria-label="Acercar mapa"
        >
          <Plus size={20} aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none"
          onClick={() => map.zoomOut({ duration: 250 })}
          aria-label="Alejar mapa"
        >
          <Minus size={20} aria-hidden="true" />
        </Button>
      </div>
      <Button
        variant="primary"
        size="icon"
        onClick={centerOnUser}
        aria-label={location ? "Centrar en mi ubicación" : "Activar mi ubicación"}
      >
        <LocateFixed size={20} aria-hidden="true" />
      </Button>
    </div>
  );
}
