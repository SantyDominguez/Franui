import { LocateFixed } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projectConfig } from "../../data/projectConfig";
import { MAP_DEFAULT_ZOOM, MAP_USER_ZOOM } from "../../lib/constants";
import { loadGoogleMaps } from "../../services/maps/googleMapsLoader";
import type { UserLocation } from "../../types/location";
import type { ProximityLevel, SearchArea } from "../../types/mission";

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

const areaColors: Record<ProximityLevel, string> = {
  locating: "#8d3154",
  "weak-signal": "#7a6f73",
  "very-cold": "#3979b8",
  cold: "#4f9fc8",
  warm: "#d79a45",
  hot: "#dc654d",
  "very-close": "#8d3154",
};

function createUserMarkerElement(avatar?: string, accuracy?: number | null) {
  const element = document.createElement("div");
  element.className = "user-location-marker";
  element.setAttribute("role", "img");
  element.setAttribute(
    "aria-label",
    `Tu ubicación, precisión aproximada ${Math.round(accuracy || 0)} metros`,
  );

  const pulse = document.createElement("span");
  pulse.className = "user-location-marker__pulse";
  pulse.setAttribute("aria-hidden", "true");

  const bubble = document.createElement("span");
  bubble.className = "user-location-marker__bubble";

  if (avatar) {
    const image = document.createElement("img");
    image.src = avatar;
    image.alt = "";
    image.className = "user-location-marker__image";
    bubble.appendChild(image);
  } else {
    const fallback = document.createElement("span");
    fallback.className = "user-location-marker__fallback";
    fallback.textContent = "♥";
    bubble.appendChild(fallback);
  }

  const direction = document.createElement("span");
  direction.className = "user-location-marker__direction";
  direction.textContent = "▲";
  direction.hidden = true;

  element.append(pulse, direction, bubble);
  return { element, direction };
}

function createDestinationMarkerElement() {
  const element = document.createElement("div");
  element.className = "destination-marker";
  const heart = document.createElement("span");
  heart.className = "destination-marker__heart";
  heart.textContent = "♥";
  element.appendChild(heart);
  return element;
}

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
  const mapsRef = useRef<typeof google.maps | null>(null);
  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const destinationMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const directionRef = useRef<HTMLSpanElement | null>(null);
  const accuracyCircleRef = useRef<google.maps.Circle | null>(null);
  const searchCircleRef = useRef<google.maps.Circle | null>(null);
  const firstLocationRef = useRef(true);
  const lastFocusRef = useRef("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || "";
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() || "DEMO_MAP_ID";
  const hasLocation = Boolean(location);
  const userPosition = useMemo(
    () =>
      location
        ? { lat: location.latitude, lng: location.longitude }
        : null,
    [location],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let readyListener: google.maps.MapsEventListener | null = null;
    const previousAuthFailure = window.gm_authFailure;
    const handleAuthFailure = () => {
      onMapError?.(
        "Google Maps rechazó la clave. Comprobá que Maps JavaScript API esté habilitada y que el dominio esté permitido.",
      );
    };
    window.gm_authFailure = handleAuthFailure;

    void loadGoogleMaps(apiKey, mapId)
      .then((maps) => {
        if (cancelled) return;
        mapsRef.current = maps;
        const instance = new maps.Map(container, {
          center: {
            lat: projectConfig.defaultMapCenter.latitude,
            lng: projectConfig.defaultMapCenter.longitude,
          },
          zoom: MAP_DEFAULT_ZOOM,
          minZoom: 3,
          maxZoom: 20,
          mapId,
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: "greedy",
          keyboardShortcuts: true,
        });
        readyListener = instance.addListener("tilesloaded", () => onMapReady?.());
        setMap(instance);
      })
      .catch((reason: unknown) => {
        const message = reason instanceof Error ? reason.message : "No pudimos iniciar Google Maps.";
        onMapError?.(message);
      });

    return () => {
      cancelled = true;
      readyListener?.remove();
      if (window.gm_authFailure === handleAuthFailure) {
        window.gm_authFailure = previousAuthFailure;
      }
      mapsRef.current = null;
      setMap(null);
      container.replaceChildren();
    };
  }, [apiKey, mapId, onMapError, onMapReady]);

  useEffect(() => {
    const maps = mapsRef.current;
    if (!map || !maps || !location || !userPosition) return;

    const { element, direction } = createUserMarkerElement(avatar, location.accuracy);
    const marker = new maps.marker.AdvancedMarkerElement({
      map,
      position: userPosition,
      title: "Tu ubicación",
      content: element,
    });
    const accuracyCircle = new maps.Circle({
      map,
      center: userPosition,
      radius: Math.max(location.accuracy || 0, 12),
      strokeColor: "#8d3154",
      strokeOpacity: 0.28,
      strokeWeight: 1,
      fillColor: "#8d3154",
      fillOpacity: 0.08,
      clickable: false,
    });

    userMarkerRef.current = marker;
    accuracyCircleRef.current = accuracyCircle;
    directionRef.current = direction;

    return () => {
      marker.map = null;
      accuracyCircle.setMap(null);
      userMarkerRef.current = null;
      accuracyCircleRef.current = null;
      directionRef.current = null;
    };
  }, [avatar, hasLocation, map]);

  useEffect(() => {
    if (!location || !userPosition) return;
    if (userMarkerRef.current) userMarkerRef.current.position = userPosition;
    accuracyCircleRef.current?.setCenter(userPosition);
    accuracyCircleRef.current?.setRadius(Math.max(location.accuracy || 0, 12));

    if (directionRef.current) {
      directionRef.current.hidden = location.heading == null;
      directionRef.current.style.transform = `translate(-50%, -50%) rotate(${location.heading || 0}deg) translateY(-31px)`;
    }
  }, [location, userPosition]);

  useEffect(() => {
    const maps = mapsRef.current;
    if (!map || !maps || !searchArea) return;

    const center = {
      lat: searchArea.center.latitude,
      lng: searchArea.center.longitude,
    };
    const color = areaColors[proximityLevel];
    const circle = new maps.Circle({
      map,
      center,
      radius: searchArea.radius,
      strokeColor: color,
      strokeOpacity: 0.9,
      strokeWeight: 3,
      fillColor: color,
      fillOpacity: 0.16,
      clickable: false,
    });
    searchCircleRef.current = circle;

    if (searchArea.showExactLocation) {
      destinationMarkerRef.current = new maps.marker.AdvancedMarkerElement({
        map,
        position: center,
        title: searchArea.label || "Destino",
        content: createDestinationMarkerElement(),
      });
    }

    return () => {
      circle.setMap(null);
      if (destinationMarkerRef.current) destinationMarkerRef.current.map = null;
      searchCircleRef.current = null;
      destinationMarkerRef.current = null;
    };
  }, [map, searchArea]);

  useEffect(() => {
    const color = areaColors[proximityLevel];
    searchCircleRef.current?.setOptions({
      strokeColor: color,
      fillColor: color,
    });
  }, [proximityLevel]);

  useEffect(() => {
    const maps = mapsRef.current;
    if (!map || !maps || !searchArea) return;

    const focusId = `${focusKey || "area"}:${hasLocation ? "with-user" : "area-only"}`;
    if (lastFocusRef.current === focusId) return;

    const bounds = searchCircleRef.current?.getBounds() || new maps.LatLngBounds();
    if (!searchCircleRef.current) {
      bounds.extend({
        lat: searchArea.center.latitude,
        lng: searchArea.center.longitude,
      });
    }
    if (userPosition) bounds.extend(userPosition);

    map.fitBounds(bounds, { top: 110, right: 55, bottom: 220, left: 55 });
    lastFocusRef.current = focusId;
  }, [focusKey, hasLocation, map, searchArea, userPosition]);

  useEffect(() => {
    if (!map || !userPosition || searchArea || !firstLocationRef.current) return;
    firstLocationRef.current = false;
    map.setCenter(userPosition);
    map.setZoom(MAP_USER_ZOOM);
  }, [map, searchArea, userPosition]);

  const centerOnUser = () => {
    if (!map || !userPosition) {
      onRequestLocation();
      return;
    }
    map.panTo(userPosition);
    map.setZoom(MAP_USER_ZOOM);
  };

  return (
    <div className="relative h-full min-h-[26rem] w-full overflow-hidden bg-[#e8e1dd]">
      <div ref={containerRef} className="absolute inset-0" aria-label="Mapa interactivo de Google Maps" />
      <button
        type="button"
        onClick={centerOnUser}
        className="absolute right-3 top-3 z-10 grid size-12 place-items-center rounded-2xl border border-white/80 bg-white text-primary shadow-lg transition active:scale-95"
        aria-label="Centrar el mapa en mi ubicación"
      >
        <LocateFixed size={21} aria-hidden="true" />
      </button>
    </div>
  );
}
