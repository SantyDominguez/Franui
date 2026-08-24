import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { projectConfig } from "../../data/projectConfig";
import { MAP_DEFAULT_ZOOM, MAP_USER_ZOOM } from "../../lib/constants";
import { useMapStore } from "../../stores/mapStore";
import type { UserLocation } from "../../types/location";
import { DestinationMarker } from "./DestinationMarker";
import { MapControls } from "./MapControls";
import { RouteLayer } from "./RouteLayer";
import { UserLocationMarker } from "./UserLocationMarker";
import { getMapStyle } from "../../services/maps/mapConfig";

type MapProps = {
  location: UserLocation | null;
  avatar?: string;
  onRequestLocation: () => void;
  onMapError?: (message: string) => void;
};

export function Map({ location, avatar, onRequestLocation, onMapError }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstLocationRef = useRef(true);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const destination = useMapStore((state) => state.selectedDestination);
  const route = useMapStore((state) => state.route);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = new MapLibreMap({
      container: containerRef.current,
      style: getMapStyle(),
      center: [projectConfig.defaultMapCenter.longitude, projectConfig.defaultMapCenter.latitude],
      zoom: MAP_DEFAULT_ZOOM,
      minZoom: 3,
      maxZoom: 19,
    });

    instance.on("error", (event) => {
      const message = (event as unknown as { error?: Error }).error?.message;
      if (message && !message.toLowerCase().includes("abort")) onMapError?.(message);
    });
    setMap(instance);

    return () => {
      instance.remove();
      setMap(null);
    };
  }, [onMapError]);

  useEffect(() => {
    if (!map || !location || !firstLocationRef.current) return;
    firstLocationRef.current = false;
    map.easeTo({
      center: [location.longitude, location.latitude],
      zoom: MAP_USER_ZOOM,
      duration: 1_100,
    });
  }, [location, map]);

  return (
    <div className="relative h-full min-h-[26rem] w-full overflow-hidden bg-[#e8e1dd]">
      <div ref={containerRef} className="absolute inset-0" aria-label="Mapa interactivo" />
      {map && location && (
        <UserLocationMarker
          map={map}
          avatar={avatar}
          latitude={location.latitude}
          longitude={location.longitude}
          heading={location.heading}
          accuracy={location.accuracy}
        />
      )}
      {map && destination && (
        <DestinationMarker
          map={map}
          latitude={destination.latitude}
          longitude={destination.longitude}
          label={destination.name}
        />
      )}
      {map && <RouteLayer map={map} route={route} />}
      {map && <MapControls map={map} location={location} onRequestLocation={onRequestLocation} />}
    </div>
  );
}
