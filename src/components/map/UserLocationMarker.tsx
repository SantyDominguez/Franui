import { useEffect, useRef } from "react";
import { Marker, type Map as MapLibreMap } from "maplibre-gl";

type UserLocationMarkerProps = {
  map: MapLibreMap;
  avatar?: string;
  latitude: number;
  longitude: number;
  heading?: number | null;
  accuracy?: number | null;
};

export function UserLocationMarker({
  map,
  avatar,
  latitude,
  longitude,
  heading,
  accuracy,
}: UserLocationMarkerProps) {
  const markerRef = useRef<Marker | null>(null);
  const directionRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    element.className = "user-location-marker";
    element.setAttribute("role", "img");
    element.setAttribute("aria-label", `Tu ubicación, precisión aproximada ${Math.round(accuracy || 0)} metros`);

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
    direction.hidden = heading == null;
    directionRef.current = direction;

    element.append(pulse, direction, bubble);
    markerRef.current = new Marker({ element, anchor: "center" })
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      directionRef.current = null;
    };
  }, [avatar, map]);

  useEffect(() => {
    markerRef.current?.setLngLat([longitude, latitude]);
  }, [latitude, longitude]);

  useEffect(() => {
    if (!directionRef.current) return;
    directionRef.current.hidden = heading == null;
    directionRef.current.style.transform = `translate(-50%, -50%) rotate(${heading || 0}deg) translateY(-31px)`;
  }, [heading]);

  return null;
}
