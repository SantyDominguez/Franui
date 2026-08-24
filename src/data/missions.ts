import type { Mission } from "../types/mission";

/**
 * V0.1 incluye una sola misión interactiva de ejemplo.
 * No agregues acá secretos reales para producción: todo el frontend puede inspeccionarse.
 */
export const missions: Mission[] = [
  {
    id: "mission-01",
    order: 1,
    title: "Donde empieza todo",
    description: "La primera pista está lista para vos.",
    type: "question",
    status: "available",
    unlockCondition: {
      type: "question",
      answer: "siempre",
      acceptedAnswers: ["para siempre"],
    },
    content: {
      eyebrow: "Primera pista",
      clue:
        "Antes de buscar un lugar en el mapa, quiero saber si recordás la palabra que mejor describe lo que quiero construir con vos.",
      prompt: "Pista de demo: empieza con “s” y termina con “e”.",
      rewardTitle: "La aventura ya comenzó",
      rewardMessage:
        "Esta respuesta es de demostración. Ahora podés abrir el mapa y probar tu ubicación real con el avatar personalizado.",
    },
  },
  {
    id: "mission-02",
    order: 2,
    title: "Una señal",
    description: "Se habilitará en V0.2.",
    type: "code",
    status: "locked",
    unlockCondition: { type: "previousMission", requiredMissionId: "mission-01" },
    content: { clue: "Contenido reservado para la siguiente fase." },
  },
  {
    id: "mission-03",
    order: 3,
    title: "Un lugar especial",
    description: "Se habilitará con geofencing en V0.3.",
    type: "geofence",
    status: "locked",
    unlockCondition: { type: "previousMission", requiredMissionId: "mission-02" },
    content: { clue: "La coordenada secreta no forma parte de esta demo." },
  },
  {
    id: "mission-04",
    order: 4,
    title: "Nuestro recuerdo",
    description: "Se habilitará en V0.5.",
    type: "photo",
    status: "locked",
    unlockCondition: { type: "previousMission", requiredMissionId: "mission-03" },
    content: { clue: "Un recuerdo llegará en una próxima versión." },
  },
  {
    id: "mission-05",
    order: 5,
    title: "La sorpresa",
    description: "El final todavía espera.",
    type: "manual",
    status: "locked",
    unlockCondition: { type: "previousMission", requiredMissionId: "mission-04" },
    content: { clue: "El final se validará de forma segura en la versión real." },
  },
];
