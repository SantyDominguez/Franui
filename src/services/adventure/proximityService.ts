import type { ProximityLevel, SearchArea } from "../../types/mission";

export type ProximityDescriptor = {
  level: ProximityLevel;
  label: string;
  message: string;
  progress: number;
};

const descriptors: Record<ProximityLevel, ProximityDescriptor> = {
  locating: {
    level: "locating",
    label: "Buscando señal",
    message: "Necesitamos tu ubicación para empezar a medir la cercanía.",
    progress: 0,
  },
  "weak-signal": {
    level: "weak-signal",
    label: "Señal imprecisa",
    message: "La ubicación está saltando. Esperá unos segundos o acercate a un lugar abierto.",
    progress: 0,
  },
  "very-cold": {
    level: "very-cold",
    label: "Muy frío",
    message: "Todavía estás lejos de la zona. Seguí avanzando y mirá cómo cambia la señal.",
    progress: 12,
  },
  cold: {
    level: "cold",
    label: "Frío",
    message: "Vas en camino, pero todavía falta. Probá acercarte un poco más.",
    progress: 32,
  },
  warm: {
    level: "warm",
    label: "Tibio",
    message: "La dirección es buena. La persona que buscás ya no está tan lejos.",
    progress: 56,
  },
  hot: {
    level: "hot",
    label: "Caliente",
    message: "Estás cerca. Prestá atención a los negocios y a las personas alrededor.",
    progress: 80,
  },
  "very-close": {
    level: "very-close",
    label: "¡Estás muy cerca!",
    message: "Llegaste a la zona indicada. El código está a pocos pasos.",
    progress: 100,
  },
};

export function getProximityLevel(
  distance: number | null,
  accuracy: number | null | undefined,
  area: SearchArea,
): ProximityLevel {
  if (distance == null) return "locating";

  const maximumReliableAccuracy = Math.max(120, area.arrivalRadius * 2);
  if (accuracy != null && accuracy > maximumReliableAccuracy) return "weak-signal";

  const hotDistance = area.hotDistance ?? 200;
  const warmDistance = area.warmDistance ?? 400;
  const coldDistance = area.coldDistance ?? 800;

  if (distance <= area.arrivalRadius) return "very-close";
  if (distance <= hotDistance) return "hot";
  if (distance <= warmDistance) return "warm";
  if (distance <= coldDistance) return "cold";
  return "very-cold";
}

export function getProximityDescriptor(level: ProximityLevel) {
  return descriptors[level];
}
