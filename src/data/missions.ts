import type { Mission } from "../types/mission";

/**
 * Ruta real de la búsqueda. Las coordenadas se usan como centro de las zonas
 * de frío/calor; la ubicación exacta permanece oculta.
 */
export const missions: Mission[] = [
  {
    id: "mission-01",
    order: 1,
    title: "Piloto como dicen en las series",
    description: "Una señal te espera por la Recta Martinoli.",
    type: "code",
    status: "locked",
    unlockCondition: { type: "code", code: "ANTOANTO" },
    searchArea: {
      // Anto Anto, Recta Martinoli — ubicación que ya estaba en la demo.
      center: { latitude: -31.3474092, longitude: -64.2666894 },
      radius: 380,
      arrivalRadius: 75,
      hotDistance: 190,
      warmDistance: 380,
      coldDistance: 760,
      showExactLocation: false,
      label: "Zona de Anto Anto",
    },
    content: {
      eyebrow: "Primera pista",
      clue: "¿No querés seguir probándote prendas?",
      arrivalMessage:
        "¡SUPER CALIENTE, como vos jaja! Estás donde tenías que llegar. Mirá bien a tu alrededor.",
      codePrompt: "Ingresá el código de esta parada.",
      image: "images/places/place-placeholder.png",
      rewardTitle: "¡Encontraste la primera!",
      rewardMessage:
        "Una pista menos. Y todavía falta bastante para descubrir la sorpresa. Espero te guste la ropa jeje",
    },
  },
  {
    id: "mission-02",
    order: 2,
    title: "Guardia de regalos",
    description: "Una pista te espera cerca del centro de cordoba",
    type: "code",
    status: "locked",
    unlockCondition: { type: "code", code: "CLERMONT180" },
    searchArea: {
      // Enfermera Clermont 180, Córdoba.
      center: { latitude: -31.405651, longitude: -64.211582 },
      radius: 380,
      arrivalRadius: 75,
      hotDistance: 190,
      warmDistance: 380,
      coldDistance: 760,
      showExactLocation: false,
      label: "Zona de Enfermera Clermont",
    },
    content: {
      eyebrow: "Segunda pista",
      clue: "Hay regalos que no vienen envueltos, vienen de parte de gente que te quiere mucho. Casa de V",
      arrivalMessage:
        "¡SUPER CALIENTE! Llegaste al punto donde los amigos dejaron su parte de la aventura. Mirá bien a tu alrededor.",
      codePrompt: "Ingresá el código que te dieron en esta parada.",
      image: "images/places/place-placeholder.png",
      rewardTitle: "¡Mensaje de los amigos desbloqueado!",
      rewardMessage:
        "Esta pista venía con complicidad incluida. Tus amigos también son parte de esta búsqueda porque saben lo mucho que te merecés algo así.",
    },
  },

  {
    id: "mission-03",
    order: 3,
    title: "Palio-TEST",
    description:
      "El siguiente punto, solo te digo, no choques la baranda plis.",
    type: "code",
    status: "locked",
    unlockCondition: { type: "code", code: "PALIO09042026" },
    searchArea: {
      // Estacionamiento del Kempes donde practican estacionar.
      center: { latitude: -31.370655, longitude: -64.248571 },
      radius: 430,
      arrivalRadius: 85,
      hotDistance: 215,
      warmDistance: 430,
      coldDistance: 860,
      showExactLocation: false,
      label: "Estacionamiento del Kempes",
    },
    content: {
      eyebrow: "tercera pista",
      clue: "¿Practicamos de nuevo? ¿O rompemos el Palio?",
      arrivalMessage:
        "¡SUPER CALIENTE! Llegaste al estacionamiento. Ahora te toca estacionar entre dos barandas.",
      codePrompt: "Ingresá el código que encontraste.",
      image: "images/places/palio.png",
      rewardTitle: "¡Palio desbloqueado!",
      rewardMessage: "Aprendiste a estacionar, muy bien. Ahora seguí buscando.",
    },
  },
  {
    id: "mission-04",
    order: 4,
    title: "Unas CC??",
    description: "La última pista con código te lleva hacia ... unas CC.",
    type: "code",
    status: "locked",
    unlockCondition: { type: "code", code: "COOKIESLOVE" },
    searchArea: {
      // Mundo Cookies, Lasalle 6370 — ubicación que ya estaba en la demo.
      center: { latitude: -31.3466666, longitude: -64.2556433 },
      radius: 420,
      arrivalRadius: 85,
      hotDistance: 210,
      warmDistance: 420,
      coldDistance: 850,
      showExactLocation: false,
      label: "Zona de Mundo Cookies",
    },
    content: {
      eyebrow: "cuarta pista",
      clue: "No vendría mal unas CC, ¿no? (bien calientes por favor)",
      arrivalMessage: "¡SUPER CALIENTE! Estás en la última parada con código.",
      codePrompt: "Ingresá el código final de esta búsqueda.",
      image: "images/places/place-placeholder.png",
      rewardTitle:
        "¡Código final encontrado, disfruta de un cafe con tus primos! Despues seguí con la búsqueda.",
      rewardMessage:
        "Listo. Ahora seguí la última coordenada y descubrí dónde termina todo.",
    },
  },
  {
    id: "mission-05",
    order: 5,
    title: "El lugar donde termina todo",
    description:
      "Una última coordenada. Esta vez, sin código: solo tenés que llegar.",
    type: "geofence",
    status: "locked",
    unlockCondition: {
      type: "previousMission",
      requiredMissionId: "mission-04",
    },
    searchArea: {
      // 31°19'56.5"S 64°17'35.8"W
      center: { latitude: -31.3323611, longitude: -64.2932778 },
      radius: 450,
      arrivalRadius: 90,
      hotDistance: 225,
      warmDistance: 450,
      coldDistance: 900,
      showExactLocation: false,
      label: "Destino final",
    },
    content: {
      eyebrow: "Final",
      clue: "Llegaste hasta acá. Ahora solo seguí la última señal.",
      arrivalMessage: "¡SUPER CALIENTE! Llegaste al destino final. te amo ❤️",
      image: "images/places/place-placeholder.png",
      rewardTitle: "Llegaste al final",
      rewardMessage: "La búsqueda terminó. Ahora empieza la parte más linda.",
    },
  },
];
