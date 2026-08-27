/**
 * Este es el primer archivo que conviene editar para personalizar el regalo.
 * Las rutas de imágenes apuntan a la carpeta /public/images.
 */
export const projectConfig = {
  appName: "Nuestra Aventura",
  recipientName: "Delfi",
  senderName: "Tu persona favorita",
  specialDate: "Una fecha que es solo nuestra",
  homeEyebrow: "Un pequeño mundo hecho para vos",
  homeTitle: "Hay historias que merecen convertirse en aventura.",
  homeMessage:
    "Preparé algo distinto: un recorrido entre recuerdos, pistas y lugares que significan mucho para nosotros.",
  coverImage: "",
  avatarImage: "images/delfi-avatar.png",
  animationAvatarImage: "images/delfi-cutout.png",
  intro: {
    motionWords: ["Feliz", "Cumpleaños", "Delfi", "Te", "Amo", "Corazón"],
    welcomeMessage: "Bienvenida a la búsqueda del tesoro",
    fireworksImage: "images/intro/fireworks-background.webp",
    /**
     * Dejalo vacío mientras probás la app.
     * Cuando decidas el horario, usá ISO con zona de Córdoba, por ejemplo:
     * "2026-09-12T18:00:00-03:00"
     */
    unlockAt: "",
    wallImages: [
      "images/intro/delfi.svg",
      "images/intro/route.svg",
      "images/intro/birthday.svg",
      "images/intro/treasure.svg",
      "images/intro/compass.svg",
      "images/intro/stars.svg",
      "images/intro/route.svg",
      "images/intro/treasure.svg",
      "images/intro/delfi.svg",
      "images/intro/birthday.svg",
    ],
  },
  driverReveal: {
    carImage: "images/driver/driver-car.webp",
    /**
     * Guardá tu foto en public/images/driver/ y escribí acá la ruta, por ejemplo:
     * "images/driver/mi-chofer.webp"
     */
    driverImage: "",
  },
  defaultMapCenter: {
    latitude: -31.4201,
    longitude: -64.1888,
  },
} as const;
