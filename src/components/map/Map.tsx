import { useEffect, useRef, useState } from "react";
import { LngLatBounds, Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { projectConfig } from "../../data/projectConfig";
import { MAP_DEFAULT_ZOOM, MAP_USER_ZOOM } from "../../lib/constants";
import { useMapStore } from "../../stores/mapStore";
import type { UserLocation } from "../../types/location";
import type { ProximityLevel, SearchArea } from "../../types/mission";
import { DestinationMarker } from "./DestinationMarker";
import { MapControls } from "./MapControls";
import { RouteLayer } from "./RouteLayer";
import { UserLocationMarker } from "./UserLocationMarker";
import { getFallbackMapStyle, getMapStyle } from "../../services/maps/mapConfig";
import { SearchAreaLayer } from "./SearchAreaLayer";

type MapProps = {
  location: UserLocation | null;
  avatar?: string;
  onRequestLocation: () => void;
  onMapError?: (message: string) => void;
  onMapReady?: () => void;
  searchArea?: SearchArea;
  proximityLevel?: ProximityLevel;
  focusKey?: string;
};

export function Map({
  location,
  avatar,
  onRequestLocation,
  onMapError,
  onMapReady,
  searchArea,
  proximityLevel = "locating",
  focusKey,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstLocationRef = useRef(true);
  const lastAreaFocusRef = useRef("");
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const destination = useMapStore((state) => state.selectedDestination);
  const route = useMapStore((state) => state.route);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let isReady = false;
    let fallbackActive = false;
    let loadingErrorCount = 0;

    const instance = new MapLibreMap({
      container,
      style: getMapStyle(),
      center: [projectConfig.defaultMapCenter.longitude, projectConfig.defaultMapCenter.latitude],
      zoom: MAP_DEFAULT_ZOOM,
      minZoom: 3,
      maxZoom: 19,
    });

    const activateFallback = () => {
      if (fallbackActive || isReady) return;
      fallbackActive = true;
      loadingErrorCount = 0;
      onMapError?.("El mapa está tardando. Probando el servidor alternativo…");
      instance.setStyle(getFallbackMapStyle());
    };

    const handleError = (event: unknown) => {
      const message = (event as unknown as { error?: Error }).error?.message;
      if (!isReady && message && !message.toLowerCase().includes("abort")) {
        loadingErrorCount += 1;
        onMapError?.("No pudimos descargar el fondo del mapa. Revisá tu conexión.");
        if (loadingErrorCount >= 2) activateFallback();
      }
    };

    const handleReady = () => {
      isReady = true;
      instance.resize();
      onMapReady?.();
    };

    instance.on("error", handleError);
    instance.on("idle", handleReady);
    setMap(instance);

    const fallbackTimer = window.setTimeout(activateFallback, 8_000);
    const firstResizeFrame = window.requestAnimationFrame(() => instance.resize());
    const resizeObserver = new ResizeObserver(() => instance.resize());
    resizeObserver.observe(container);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.cancelAnimationFrame(firstResizeFrame);
      resizeObserver.disconnect();
      instance.off("error", handleError);
      instance.off("idle", handleReady);
      instance.remove();
      setMap(null);
    };
  }, [onMapError, onMapReady]);

  useEffect(() => {
    if (!map || !location || !firstLocationRef.current) return;
    firstLocationRef.current = false;
    map.easeTo({
      center: [location.longitude, location.latitude],
      zoom: MAP_USER_ZOOM,
      duration: 1_100,
    });
  }, [location, map]);

  useEffect(() => {
    if (!map || !searchArea) return;
    const hasUser = Boolean(location);
    const currentFocusKey = `${focusKey || "area"}:${hasUser ? "with-user" : "area-only"}`;
    if (lastAreaFocusRef.current === currentFocusKey) return;

    const focusArea = () => {
      const latitudeDelta = searchArea.radius / 111_320;
      const longitudeScale = Math.max(Math.cos((searchArea.center.latitude * Math.PI) / 180), 0.2);
      const longitudeDelta = searchArea.radius / (111_320 * longitudeScale);
      const bounds = new LngLatBounds(
        [
          searchArea.center.longitude - longitudeDelta,
          searchArea.center.latitude - latitudeDelta,
        ],
        [
          searchArea.center.longitude + longitudeDelta,
          searchArea.center.latitude + latitudeDelta,
        ],
      );
      if (location) bounds.extend([location.longitude, location.latitude]);

      map.fitBounds(bounds, {
        padding: { top: 115, right: 58, bottom: 310, left: 58 },
        maxZoom: 16,
        duration: 1_000,
      });
      lastAreaFocusRef.current = currentFocusKey;
    };

    if (map.isStyleLoaded()) focusArea();
    else map.once("load", focusArea);
    return () => {
      map.off("load", focusArea);
    };
  }, [focusKey, location, map, searchArea]);

  return (
    <div className="relative h-full min-h-[26rem] w-full overflow-hidden bg-[#e8e1dd]">
      <div ref={containerRef} className="absolute inset-0" aria-label="Mapa interactivo" />
      {map && searchArea && (
        <SearchAreaLayer map={map} area={searchArea} level={proximityLevel} />
      )}
      {map && searchArea?.showExactLocation && (
        <DestinationMarker
          map={map}
          latitude={searchArea.center.latitude}
          longitude={searchArea.center.longitude}
          label={searchArea.label || "Objetivo"}
        />
      )}
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
