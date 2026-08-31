# Franui — Nuestra Aventura 💗

V0.3.0 funcional de un regalo interactivo mobile-first: secuencia inicial sobre fuegos artificiales, pared 3D optimizada a dos columnas, revelación animada del chofer, pistas progresivas, Google Maps integrado, geolocalización en vivo, avatar personalizado, zonas circulares, frío/calor y despliegue HTTPS mediante GitHub Pages.

> Alcance honesto: esta versión sirve como demo completa del recorrido GPS + código. No incluye backend, cuentas, códigos realmente secretos, buscador de direcciones, rutas paso a paso ni funcionamiento offline.

## Cómo funciona la aventura

1. Ella abre la primera pista.
2. La pista activa un círculo de búsqueda en el mapa.
3. El navegador solicita permiso para utilizar la ubicación.
4. Franui compara localmente la posición con el centro configurado.
5. La pantalla cambia entre **Muy frío**, **Frío**, **Tibio**, **Caliente** y **SUPER CALIENTE**.
6. Al llegar al lugar, aparece una animación de **SUPER CALIENTE** con la cara de Delfi y el PNG del lugar.
7. En las paradas con código, ella escribe el código encontrado.
8. Si es correcto, aparece una segunda animación de desbloqueo y se habilita la siguiente pista.
9. Las animaciones se registran en el almacenamiento local para que cada una aparezca una sola vez, incluso al recargar.

El GPS orienta las cuatro paradas con código. En el quinto y último punto, el GPS sí confirma automáticamente la llegada al destino final. Los cuatro primeros códigos siguen siendo la confirmación final de cada parada.

## Qué funciona ahora

- Portada personalizada y botón **Empezar búsqueda**.
- Cinco etapas reales: prueba inicial, Anto Anto, estacionamiento del Kempes, Mundo Cookies y destino final.
- Estados `locked`, `available` y `completed`.
- Una sola pista siguiente disponible por vez.
- Zona circular distinta para cada misión.
- Cálculo de distancia geodésica mediante Haversine.
- Indicador de frío/calor calculado directamente desde la última lectura disponible.
- Detector reactivo: recalcula frío/calor con cada coordenada nueva, sin recargar la página.
- `watchPosition` reforzado por una lectura fresca cada 4 segundos mientras el mapa está visible.
- El seguimiento se pausa cuando la web queda oculta y se reanuda al volver, respetando las limitaciones de iOS.
- Bandeja de frío/calor minimizable en celular; mantiene visible un resumen compacto y se abre con un toque.
- Apertura automática de la bandeja cuando la persona entra en la zona **SUPER CALIENTE**.
- Estado especial cuando la precisión del GPS es insuficiente.
- Códigos configurados: `PRUEBA1`, `ANTO_SECRETO`, `PALIO09042026` y `CRUMBLESCOOKIES`.
- Recompensa y paso a la siguiente pista.
- Reinicio de la aventura de prueba.
- Google Maps integrado dentro de Franui mediante Maps JavaScript API.
- Mensajes claros cuando falta la clave, la API está deshabilitada o el dominio no está permitido.
- Seguimiento de ubicación mediante Web Geolocation API.
- Avatar de Delfi recortado en lugar del corazón/punto genérico del mapa.
- Orientación cuando el dispositivo proporciona `heading`.
- Botón para centrar el mapa y controles de zoom.
- Diseño mobile-first, accesible y responsive.
- Motion graphics a pantalla completa antes de cargar las fotografías: **Feliz → Cumpleaños → Delfi → Te → Amo → Corazón**.
- Fondo fotográfico de fuegos artificiales optimizado para celular.
- La pared `DriftWall` se monta recién al terminar la dedicatoria y utiliza solamente dos columnas para reducir trabajo visual y mejorar la fluidez en iPhone.
- Segunda escena con pared 3D, “Bienvenida a tu búsqueda del tesoro” y botón **Desbloquear aventura**.
- Al tocar **Empezar búsqueda**, aparece “Tu chofer va a ser…”, un auto cruza la pantalla y luego se revela una foto configurable.
- Portada principal simplificada, sin el bloque de destinos/GPS/códigos ni íconos decorativos.
- Bloqueo opcional de **Desbloquear aventura** por fecha y hora, con aviso exacto y cuenta regresiva en vivo.
- Modo de prueba automático cuando todavía no se configuró el horario.
- Identidad visual actualizada a rosa, coral, crema y plateado; el azul queda reservado para información fría/GPS y contraste.
- Escala frío/calor: azul → celeste → amarillo → coral → **SUPER CALIENTE** en rosa intenso, tanto en el panel como en el círculo del mapa.
- Datos, UI, GPS, mapa, proximidad y estado separados por módulos.

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.
- Navegador moderno con JavaScript y Geolocation.
- Clave de Google Maps para web con **Maps JavaScript API** habilitada.

## Ejecutar en Windows (PowerShell)

```powershell
cd "C:\ruta\donde\descomprimiste\Franui"
Copy-Item .env.example .env
npm install
npm run dev
```

Después abrí `.env` y agregá tu clave:

```env
VITE_GOOGLE_MAPS_API_KEY=TU_CLAVE_DE_GOOGLE_MAPS
```

Abrí la dirección que muestra Vite. En la misma computadora, `http://localhost:5173` puede solicitar ubicación.

Para comprobar la versión de producción:

```powershell
npm run build
npm run preview
```

La salida compilada queda en `dist/`.

### Clave de prueba o clave estándar

Para probar rápidamente podés utilizar una **Maps Demo Key** de Google. Está pensada para prototipos y tiene límites. Para la entrega definitiva, usá una clave estándar con facturación, límite de gasto y restricciones por dominio/API.

## Probar desde un teléfono

La geolocalización web exige un **contexto seguro**:

- `localhost` funciona en la computadora de desarrollo.
- En el teléfono, `http://192.168.x.x:5173` normalmente no habilita geolocalización.
- Para una prueba real, publicá la demo mediante HTTPS.
- La persona debe aceptar el permiso de ubicación del navegador.
- En iPhone/iOS, esta versión requiere mantener la web o PWA abierta y en uso; no presupone GPS indefinido en segundo plano.

Probá cada ubicación real antes del regalo. Dentro de edificios la precisión puede empeorar, por lo que conviene usar radios de llegada de 60 a 120 metros y no exigir un punto exacto.

## Publicar con HTTPS en GitHub Pages

El proyecto incluye `.github/workflows/deploy-pages.yml`. Cada vez que subas cambios a la rama `main`, GitHub instalará, compilará y publicará Franui automáticamente.

### Primera publicación

1. Creá en GitHub un repositorio público llamado exactamente `Franui`.
2. Subí el contenido de esta carpeta a la rama `main`.
3. Entrá en el repositorio y abrí **Settings → Pages**.
4. En **Build and deployment → Source**, elegí **GitHub Actions**.
5. Abrí **Settings → Secrets and variables → Actions**.
6. Creá un secreto llamado exactamente `VITE_GOOGLE_MAPS_API_KEY` y pegá la clave.
7. Abrí la pestaña **Actions** y ejecutá `Deploy Franui to GitHub Pages`.

La dirección esperada para el usuario `SantyDominguez` será:

```text
https://santydominguez.github.io/Franui/
```

GitHub Pages entrega un certificado HTTPS válido. Desde esa dirección el navegador del teléfono podrá solicitar ubicación y Google Maps podrá validar el dominio, siempre que los permisos y servicios de ubicación estén activos.

En Google Cloud restringí la clave a:

```text
https://santydominguez.github.io/*
http://localhost:5173/*
```

En **API restrictions**, permití únicamente **Maps JavaScript API**. La clave web termina incluida en el JavaScript del navegador; la protección real son esas restricciones, no el secreto de GitHub.

> Importante: GitHub Pages es públicamente accesible. En esta demo los códigos y coordenadas ya son inspeccionables en el frontend. No publiques fotos o mensajes que no quieras alojar públicamente.

## Configurar las pistas reales

Todas las paradas están en:

```text
src/data/missions.ts
```

La versión entregada incluye estas cinco etapas, en este orden:

| Pista | Lugar | Centro | Radio visible | Código |
|---|---|---|---|---|
| 1 | Estancia Santa Catalina (prueba) | `-31.360987, -64.304996` | 400 m | `PRUEBA1` |
| 2 | Anto Anto / Recta Martinoli | `-31.3474092, -64.2666894` | 380 m | `ANTO_SECRETO` |
| 3 | Estacionamiento del Kempes | `-31.370655, -64.248571` | 430 m | `PALIO09042026` |
| 4 | Mundo Cookies / Lasalle | `-31.3466666, -64.2556433` | 420 m | `CRUMBLESCOOKIES` |
| 5 | Destino final | `-31.3323611, -64.2932778` | 450 m | — |

Podés agregar nuevas paradas o cambiar cada `center`, texto y código en ese mismo archivo:

```ts
{
  id: "mission-01",
  order: 1,
  title: "La primera parada",
  type: "code",
  status: "available",
  unlockCondition: {
    type: "code",
    code: "CODIGO-QUE-ENTREGA-LA-PERSONA",
  },
  searchArea: {
    center: { latitude: -31.360987, longitude: -64.304996 },
    radius: 400,
    arrivalRadius: 80,
    hotDistance: 200,
    warmDistance: 400,
    coldDistance: 800,
    showExactLocation: false,
    label: "Zona de la primera pista",
  },
  content: {
    eyebrow: "Primera pista",
    clue: "Tu texto romántico o misterioso.",
    arrivalMessage: "¡SUPER CALIENTE! Buscá el código que te entreguen.",
    codePrompt: "Ingresá el código que te entregue.",
    rewardTitle: "Pista completada",
    rewardMessage: "Tu mensaje de recompensa.",
  },
}
```

### Qué significa cada distancia

- `radius`: tamaño del círculo visible en el mapa; representa la zona aproximada.
- `arrivalRadius`: dentro de esta distancia aparece **SUPER CALIENTE** y se dispara la animación de llegada.
- `hotDistance`: límite de **Caliente**.
- `warmDistance`: límite de **Tibio**.
- `coldDistance`: límite de **Frío**; fuera de él aparece **Muy frío**.
- `showExactLocation: false`: no muestra el pin exacto, solamente el círculo.
- `showExactLocation: true`: agrega un marcador en el centro para una misión futura que sí deba revelarlo.

Las distancias están expresadas en metros. Deben cumplir aproximadamente:

```text
arrivalRadius < hotDistance < warmDistance < coldDistance
```

## Personalizar el regalo

### Horario de desbloqueo de la bienvenida

Editá `src/data/projectConfig.ts` y buscá:

```ts
unlockAt: "",
```

Vacío significa **modo de prueba** y deja habilitado el botón **Desbloquear aventura**. Cuando decidas el momento real, cargalo en formato ISO incluyendo la zona horaria de Córdoba:

```ts
unlockAt: "2026-09-12T18:00:00-03:00",
```

Antes de esa fecha el botón queda deshabilitado, la pantalla informa el día y la hora y muestra una cuenta regresiva. Al llegar el momento se habilita automáticamente sin recargar.

### Textos, nombre y mapa inicial

Editá:

```text
src/data/projectConfig.ts
```

Ahí podés cambiar el nombre, la firma, la fecha, la portada, el centro inicial del mapa y las imágenes.

### Fotos

Guardá, por ejemplo:

```text
public/images/portada.webp
public/images/avatar.webp
```

Y configurá:

```ts
coverImage: `${import.meta.env.BASE_URL}images/portada.webp`,
avatarImage: `${import.meta.env.BASE_URL}images/avatar.webp`,
```

Se recomienda WebP y menos de 500 KB por imagen.

La pared animada de la bienvenida usa inicialmente las ilustraciones de `public/images/intro/`. Para reemplazarlas por fotos, guardalas en `public/images/intro/` y cambiá la lista `intro.wallImages` dentro de `src/data/projectConfig.ts`. Usá rutas como `"images/intro/nuestra-foto.webp"`; no agregues una barra al comienzo. La interfaz reparte la lista entre **dos columnas verticales** y recicla esas imágenes para sostener el movimiento continuo.

### Foto del chofer

Guardá una foto vertical en `public/images/driver/`, por ejemplo `mi-chofer.webp`, y configurá en `src/data/projectConfig.ts`:

```ts
driverImage: "images/driver/mi-chofer.webp",
```

Si el valor queda vacío, la animación muestra un espacio de prueba para la foto. El auto ya incluido está en `public/images/driver/driver-car.webp`.

### Colores

Los tokens visuales están centralizados al comienzo de `src/index.css`. Las variables principales son `--brand-primary`, `--brand-background`, `--brand-surface`, `--brand-ink`, `--brand-muted`, `--brand-accent`, `--brand-success`, `--brand-warning` y `--brand-danger`.

## Variables de entorno

Copiá `.env.example` como `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=
VITE_GOOGLE_MAPS_MAP_ID=
VITE_GEOCODING_URL=https://nominatim.openstreetmap.org
VITE_ROUTING_URL=
VITE_API_URL=
```

- Si `VITE_GOOGLE_MAPS_MAP_ID` está vacío, la demo usa `DEMO_MAP_ID` para habilitar el avatar personalizado.
- Geocoding y routing están abstraídos, pero todavía no aparecen en la interfaz.
- `.env` está ignorado por Git.
- Una clave web de Google Maps es visible en el navegador: restringila por dominio y API. Nunca pongas secretos privados de backend en variables `VITE_*`.

## Estructura relevante

```text
Franui/
├── public/
├── src/
│   ├── app/                       # App, router y providers
│   ├── components/map/            # Mapa, avatar, círculo y controles
│   ├── data/missions.ts           # Paradas, códigos y textos de la demo
│   ├── features/adventure/        # Pistas, progreso, código y frío/calor
│   ├── features/location/         # GPS, distancia y estabilidad
│   ├── pages/                     # Home, aventura, mapa y demás rutas
│   ├── services/adventure/        # Reglas de misiones y proximidad
│   ├── services/maps/             # Cargador de Google Maps y futuros servicios
│   ├── stores/                    # Progreso y estado global mínimo
│   └── types/                     # Entidades TypeScript
├── .env.example
├── package.json
└── README.md
```

La dirección principal es `UI → feature → service`. `App.tsx` solo compone providers y router.

## Ubicación, privacidad y secretos

- La ubicación se mantiene en memoria mientras el mapa está montado.
- Al salir de `/map`, se limpia `watchPosition`.
- La ubicación no se guarda en `localStorage` ni se envía a una API propia.
- El cálculo de cercanía ocurre localmente en el teléfono.
- Solo el progreso de las misiones se guarda en el navegador.
- No hay backend ni cuentas.
- El mapa necesita Internet y una clave válida para cargar Google Maps.

Los códigos y las coordenadas de esta V0.2 están en el JavaScript del frontend y una persona técnica podría inspeccionarlos. Esto es aceptable para la demo. Para ocultar pistas reales frente a inspección deliberada, la validación y el contenido futuro deben moverse a un backend.

## Estado del roadmap

- **V0.1 completa:** portada, mapa, ubicación y avatar.
- **V0.2 actual:** misiones progresivas, círculos GPS, frío/calor, códigos y recompensas.
- **V0.3:** buscador, geocoding y editor simple de destinos.
- **V0.4:** routing, ruta, ETA, instrucciones y recálculo.
- **V0.5:** fotos, cartas, canciones y recuerdos desbloqueables.
- **V0.6:** PWA completa, cache controlado y pruebas reales en iPhone.
- **V0.7:** Creator/Admin autenticado y validación de secretos en backend.

## Comandos disponibles

```bash
npm run dev        # servidor de desarrollo
npm run dev:clean  # reinicia la caché de Vite
npm run typecheck  # verificación TypeScript
npm run build      # typecheck + build de producción
npm run preview    # previsualizar dist/
```

---

Hecho para convertir lugares y recuerdos en una historia que se pueda vivir. 💗
