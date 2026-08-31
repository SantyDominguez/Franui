/**
 * Este es el primer archivo que conviene editar para personalizar el regalo.
 * Las rutas de imágenes apuntan a la carpeta /public/images.
 */
export const projectConfig = {
  appName: "Busqueda del tesoro",
  recipientName: "Delfi",
  senderName: "Santy <3",
  specialDate: "Mas mascarillas por fa",
  homeEyebrow: "Una MINI aventura para vos",
  homeTitle: "Espero que te guste esta mision",
  homeMessage:
    "Preparé algo distinto: un recorrido entre recuerdos, pistas y lugares. Ya te vas a dar cuenta.",
  coverImage: "images/intro/FRANUIIIII3.jpg",
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
      "images/intro/BARIFRANUI.jpg",
      "images/intro/FRANU222.jpg",
      "images/intro/FRANUIBARI2.jpg",
      "images/intro/FRANUIIIII3.jpg",
      "images/intro/MICUMPLEFRANUI.jpg",
    ],
  },
  driverReveal: {
    carImage: "images/driver/driver-car.webp",
    driverImage: "images/intro/Guadaprimadelfi.jpg",
  },
  defaultMapCenter: {
    latitude: -31.4201,
    longitude: -64.1888,
  },
} as const;
