import type { Mission } from "../types/mission";

/**
 * V0.2 incluye tres paradas de demostración en Córdoba.
 * Cambiá center, textos y códigos por los datos reales antes de entregar el regalo.
 * En este prototipo los códigos viven en el frontend y pueden inspeccionarse.
 */
export const missions: Mission[] = [
  {
    id: "mission-01",
    order: 1,
    title: "La primera parada",
    description: "Una zona de la ciudad guarda el primer código.",
    type: "code",
    status: "available",
    unlockCondition: {
      type: "code",
      code: "FRANUI1",
    },
    searchArea: {
      center: { latitude: -31.4201, longitude: -64.1888 },
      radius: 300,
      arrivalRadius: 80,
      hotDistance: 200,
      warmDistance: 400,
      coldDistance: 800,
      showExactLocation: false,
      label: "Zona de la primera pista",
    },
    content: {
      eyebrow: "Primera pista",
      clue:
        "Hay una persona esperándote dentro de esta zona. Seguí las señales de frío y calor hasta encontrar el lugar.",
      arrivalMessage:
        "Estás muy cerca. Entrá al lugar y buscá a la persona que tiene algo preparado para vos.",
      codePrompt: "Ingresá el código que te entregue esa persona.",
      rewardTitle: "Primera señal encontrada",
      rewardMessage:
        "Encontraste el primer código. Una nueva pista ya está disponible.",
    },
  },
  {
    id: "mission-02",
    order: 2,
    title: "Una nueva señal",
    description: "La segunda persona tiene la próxima pieza.",
    type: "code",
    status: "locked",
    unlockCondition: { type: "code", code: "FRANUI2" },
    searchArea: {
      center: { latitude: -31.4178, longitude: -64.1862 },
      radius: 280,
      arrivalRadius: 75,
      hotDistance: 190,
      warmDistance: 380,
      coldDistance: 760,
      showExactLocation: false,
      label: "Zona de la segunda pista",
    },
    content: {
      eyebrow: "Segunda pista",
      clue: "El camino continúa cerca de otro lugar. El mapa no te dirá cuál: vas a tener que sentirlo.",
      arrivalMessage: "La señal está ardiendo. Buscá a la persona indicada dentro del lugar.",
      codePrompt: "Escribí el segundo código.",
      rewardTitle: "Dos de tres",
      rewardMessage: "Ya entendiste el juego. Solo queda una parada en esta demostración.",
    },
  },
  {
    id: "mission-03",
    order: 3,
    title: "La última parada",
    description: "El tercer código cierra la aventura de prueba.",
    type: "code",
    status: "locked",
    unlockCondition: { type: "code", code: "FRANUI3" },
    searchArea: {
      center: { latitude: -31.423, longitude: -64.192 },
      radius: 320,
      arrivalRadius: 85,
      hotDistance: 210,
      warmDistance: 420,
      coldDistance: 850,
      showExactLocation: false,
      label: "Zona de la última pista",
    },
    content: {
      eyebrow: "Tercera pista",
      clue: "Una última persona te espera. Esta vez, confiá en todo lo que aprendiste durante el camino.",
      arrivalMessage: "Llegaste a la zona final. El último código está muy cerca de vos.",
      codePrompt: "Ingresá el código final de la demo.",
      rewardTitle: "Lo lograste",
      rewardMessage: "Completaste las tres paradas. La aventura real puede terminar con tu sorpresa especial.",
    },
  },
];
