import { useEffect, useRef } from "react";
import { Marker, type Map as MapLibreMap } from "maplibre-gl";

type DestinationMarkerProps = {
  map: MapLibreMap;
  latitude: number;
  longitude: number;
  label?: string;
};

export function DestinationMarker({ map, latitude, longitude, label = "Destino" }: DestinationMarkerProps) {
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    element.className = "destination-marker";
    element.setAttribute("role", "img");
    element.setAttribute("aria-label", label);
    const heart = document.createElement("span");
    heart.className = "destination-marker__heart";
    heart.textContent = "♥";
    element.appendChild(heart);

    markerRef.current = new Marker({ element, anchor: "bottom" })
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [label, latitude, longitude, map]);

  useEffect(() => {
    markerRef.current?.setLngLat([longitude, latitude]);
  }, [latitude, longitude]);

  return null;
}
