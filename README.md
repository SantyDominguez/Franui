# Franui — Nuestra Aventura 💗

V0.2.3 funcional de un regalo romántico mobile-first: portada, pistas progresivas, mapa MapLibre, geolocalización en vivo, avatar personalizado, zonas circulares, frío/calor y despliegue HTTPS mediante GitHub Pages.

> Alcance honesto: esta versión sirve como demo completa del recorrido GPS + código. No incluye backend, cuentas, códigos realmente secretos, buscador de direcciones, rutas paso a paso ni funcionamiento offline.

## Cómo funciona la aventura

1. Ella abre la primera pista.
2. La pista activa un círculo de búsqueda en el mapa.
3. El navegador solicita permiso para utilizar la ubicación.
4. Franui compara localmente la posición con el centro configurado.
5. La pantalla cambia entre **Muy frío**, **Frío**, **Tibio**, **Caliente** y **Muy cerca**.
6. Al llegar al comercio o lugar, una persona le entrega un código.
7. Ella escribe ese código en la app.
8. Si es correcto, se completa la misión y se habilita la siguiente.

El GPS orienta, pero **no desbloquea la misión automáticamente**. El código entregado por la persona es la confirmación final. También puede escribirse desde la pantalla de la pista si el GPS del teléfono falla.

## Qué funciona ahora

- Portada romántica y botón **Comenzar aventura**.
- Tres misiones de demostración, ordenadas y persistidas en el navegador.
- Estados `locked`, `available` y `completed`.
- Una sola pista siguiente disponible por vez.
- Zona circular distinta para cada misión.
- Cálculo de distancia geodésica mediante Haversine.
- Indicador estable de frío/calor que evita saltos ante pequeñas variaciones del GPS.
- Estado especial cuando la precisión del GPS es insuficiente.
- Código entregado en el mundo real como condición de desbloqueo.
- Recompensa y paso a la siguiente pista.
- Reinicio de la aventura de prueba.
- Mapa con MapLibre GL JS y datos de OpenStreetMap.
- Proveedor OpenFreeMap sin API key, respaldo raster OSM y recarga manual ante fallos.
- Seguimiento de ubicación mediante Web Geolocation API.
- Avatar/foto personalizado en lugar del punto azul.
- Orientación cuando el dispositivo proporciona `heading`.
- Botón para centrar el mapa y controles de zoom.
- Diseño mobile-first, accesible y responsive.
- Datos, UI, GPS, mapa, proximidad y estado separados por módulos.

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.
- Navegador moderno con WebGL y Geolocation.

## Ejecutar en Windows (PowerShell)

```powershell
cd "C:\ruta\donde\descomprimiste\Franui"
Copy-Item .env.example .env
npm install
npm run dev
```

Abrí la dirección que muestra Vite. En la misma computadora, `http://localhost:5173` puede solicitar ubicación.

Para comprobar la versión de producción:

```powershell
npm run build
npm run preview
```

La salida compilada queda en `dist/`.

### Si Vite muestra un error de `maplibre-gl-worker.mjs`

Esta versión excluye `maplibre-gl` del preempaquetado de desarrollo. Si venís de una versión anterior y Vite conserva una caché vieja, cerrá el servidor y ejecutá:

```powershell
npm run dev:clean
```

Eso fuerza una caché nueva. En una carpeta recién descomprimida normalmente alcanza con `npm install` y `npm run dev`.

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
5. Abrí la pestaña **Actions** y esperá que finalice `Deploy Franui to GitHub Pages`.

La dirección esperada para el usuario `SantyDominguez` será:

```text
https://santydominguez.github.io/Franui/
```

GitHub Pages entrega un certificado HTTPS válido. Desde esa dirección el navegador del teléfono podrá solicitar ubicación, siempre que el permiso de Chrome/Safari y los servicios de ubicación del dispositivo estén activados.

> Importante: GitHub Pages es públicamente accesible. En esta demo los códigos y coordenadas ya son inspeccionables en el frontend. No publiques fotos o mensajes que no quieras alojar públicamente.

## Configurar las pistas reales

Todas las paradas de demostración están en:

```text
src/data/missions.ts
```

La versión entregada incluye estos datos de prueba:

| Pista | Centro de prueba | Código de prueba |
|---|---|---|
| 1 | `-31.4201, -64.1888` | `FRANUI1` |
| 2 | `-31.4178, -64.1862` | `FRANUI2` |
| 3 | `-31.4230, -64.1920` | `FRANUI3` |

Reemplazá cada `center`, texto y código antes de usar la aventura real:

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
    clue: "Tu texto romántico o misterioso.",
    arrivalMessage: "Estás muy cerca. Buscá a la persona indicada.",
    codePrompt: "Ingresá el código que te entregue.",
    rewardTitle: "Pista completada",
    rewardMessage: "Tu mensaje de recompensa.",
  },
}
```

### Qué significa cada distancia

- `radius`: tamaño del círculo visible en el mapa; representa la zona aproximada.
- `arrivalRadius`: dentro de esta distancia aparece **Muy cerca**.
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

### Colores

Los tokens visuales están centralizados al comienzo de `src/index.css`. Las variables principales son `--brand-primary`, `--brand-background`, `--brand-surface`, `--brand-ink`, `--brand-muted`, `--brand-accent`, `--brand-success`, `--brand-warning` y `--brand-danger`.

## Variables de entorno

Copiá `.env.example` como `.env`:

```env
VITE_MAP_STYLE_URL=
VITE_GEOCODING_URL=https://nominatim.openstreetmap.org
VITE_ROUTING_URL=
VITE_API_URL=
```

- Si `VITE_MAP_STYLE_URL` está vacío, usa OpenFreeMap con datos de OpenStreetMap y conserva un respaldo raster OSM.
- Geocoding y routing están abstraídos, pero todavía no aparecen en la interfaz.
- `.env` está ignorado por Git.
- Nunca guardes secretos privados en variables `VITE_*`: llegan al navegador.

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
│   ├── services/maps/             # Configuración y futuros proveedores
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
- El mapa necesita Internet para descargar mosaicos.

Los códigos y las coordenadas de esta V0.2 están en el JavaScript del frontend y una persona técnica podría inspeccionarlos. Esto es aceptable para la demo. Para ocultar pistas reales frente a inspección deliberada, la validación y el contenido futuro deben moverse a un backend.

## OpenStreetMap

La configuración por defecto usa `tile.openstreetmap.org` únicamente para demostración y conserva la atribución. No la uses para carga masiva, precarga u offline. Para tráfico real, elegí un proveedor adecuado o infraestructura propia y respetá sus condiciones.

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
npm run dev:clean  # reinicia la caché de Vite si falla el worker de MapLibre
npm run typecheck  # verificación TypeScript
npm run build      # typecheck + build de producción
npm run preview    # previsualizar dist/
```

---

Hecho para convertir lugares y recuerdos en una historia que se pueda vivir. 💗
