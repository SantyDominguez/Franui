# OUR PLATFORM — Nuestra Aventura 💗

V0.1 funcional de una experiencia romántica mobile-first con portada, primera pista, mapa MapLibre, geolocalización en vivo y avatar personalizado.

> Alcance honesto: este ZIP implementa **V0.1** y deja preparada la arquitectura de las fases siguientes. No incluye todavía backend, cuentas, secretos seguros, geofencing productivo, rutas paso a paso ni funcionamiento offline.

## Qué funciona ahora

- Portada romántica responsive.
- Botón **Comenzar aventura**.
- Primera pista interactiva de demostración.
- Progreso local de la aventura con Zustand.
- Reinicio de la demo.
- Mapa con MapLibre GL JS y datos de OpenStreetMap.
- Solicitud y seguimiento de ubicación mediante Web Geolocation API.
- Avatar/foto personalizado en lugar del punto azul.
- Orientación del marcador cuando el dispositivo entrega `heading`.
- Estados de permiso, espera, error, ubicación no disponible y precisión.
- Botón para centrar el mapa y controles de zoom accesibles.
- Diseño mobile-first con navegación inferior.
- Rutas preparadas para aventura, mapa, navegación, recuerdos, lugares, eventos, perfil, ajustes y admin.
- Servicios separados para mapas, geocoding, routing, almacenamiento y misiones.
- Tokens visuales centralizados para cambiar la identidad.

## Lo que está preparado, pero no se presenta como terminado

- `geocoding.ts`: contrato y búsqueda compatibles con Nominatim para V0.2; todavía no está conectada a la interfaz.
- `routing.ts`: contrato independiente del proveedor para V0.4; requiere `VITE_ROUTING_URL`.
- `RouteLayer` y `DestinationMarker`: listos para recibir datos en fases posteriores.
- Modelo genérico `Mission`, servicio de desbloqueo y cálculo de geofence.
- Rutas de recuerdos, lugares, eventos, perfil y admin con superficies de avance.
- Manifest inicial. La instalación/offline real, iconos definitivos y service worker corresponden a V0.6.

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.
- Navegador moderno con WebGL y Geolocation.

## Ejecutar en Windows (PowerShell)

```powershell
cd "C:\ruta\donde\descomprimiste\our-platform"
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

## Probar desde un teléfono

La geolocalización web exige un **contexto seguro**:

- `localhost` funciona en la computadora de desarrollo.
- En un teléfono, una dirección local como `http://192.168.x.x:5173` normalmente **no** habilita geolocalización.
- Para una prueba real en el celular, publicá la demo mediante HTTPS o usá un entorno HTTPS de desarrollo confiable.

En iPhone/iOS, la PWA debe estar abierta y en uso para esta primera versión. No se presupone seguimiento GPS indefinido en segundo plano.

## Personalizar el regalo

### 1. Textos principales

Editá:

```text
src/data/projectConfig.ts
```

Ahí podés cambiar:

- nombre de ella;
- tu firma;
- fecha especial;
- título y mensaje de portada;
- centro inicial del mapa;
- rutas de portada y avatar.

### 2. Fotos

Guardá, por ejemplo:

```text
public/images/portada.webp
public/images/avatar.webp
```

Y configurá:

```ts
coverImage: "/images/portada.webp",
avatarImage: "/images/avatar.webp",
```

Se recomienda WebP y menos de 500 KB por imagen para que la experiencia cargue rápido en el celular.

### 3. Primera pista

Editá:

```text
src/data/missions.ts
```

La respuesta actual de demostración es `siempre` (también acepta `para siempre`). Está visible en el frontend a propósito porque V0.1 no tiene backend.

**No pongas códigos, coordenadas o sorpresas reales que deban permanecer secretas en este archivo para la versión final.** Todo JavaScript enviado al navegador puede inspeccionarse.

### 4. Colores y estilo

Los tokens están centralizados al comienzo de:

```text
src/index.css
```

Variables principales:

- `--brand-primary`
- `--brand-primary-strong`
- `--brand-primary-soft`
- `--brand-background`
- `--brand-surface`
- `--brand-ink`
- `--brand-muted`
- `--brand-accent`
- `--brand-success`
- `--brand-warning`
- `--brand-danger`

## Variables de entorno

El proyecto trae `.env` y `.env.example`:

```env
VITE_MAP_STYLE_URL=
VITE_GEOCODING_URL=https://nominatim.openstreetmap.org
VITE_ROUTING_URL=
VITE_API_URL=
```

- Si `VITE_MAP_STYLE_URL` está vacío, la demo usa mosaicos raster públicos de OpenStreetMap con atribución visible.
- Nominatim queda preparado para la siguiente fase. Antes de uso real, hay que respetar su política, límites y requisitos de identificación.
- No se eligió todavía un proveedor definitivo de routing.
- Nunca guardes secretos privados en variables `VITE_*`: quedan expuestos en el navegador.

## Estructura

```text
our-platform/
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.webmanifest
├── src/
│   ├── app/                 # App, router y providers
│   ├── components/
│   │   ├── layout/          # Header, navegación y shell
│   │   ├── map/             # MapLibre, marcadores, ruta y controles
│   │   ├── romance/         # Portada, mensajes y recuerdos
│   │   └── ui/              # Componentes reutilizables
│   ├── data/                # Configuración y misiones de demo
│   ├── features/            # Módulos por funcionalidad
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/            # APIs externas abstraídas
│   ├── stores/              # Estado global mínimo con Zustand
│   └── types/               # Entidades TypeScript
├── .env
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

La dirección de dependencias es:

```text
UI → feature → service → API externa
```

`App.tsx` solamente compone providers y router; la lógica no está concentrada ahí.

## Ubicación y privacidad

- La posición se mantiene en memoria mientras la pantalla del mapa está montada.
- Al salir de `/map`, el hook limpia `watchPosition`.
- La ubicación no se guarda en `localStorage`.
- El progreso de la pista de demo sí se guarda localmente.
- No hay backend ni transmisión de ubicación a una API propia.
- El mapa necesita Internet para descargar los mosaicos.

Para producción se deberá usar HTTPS, política de privacidad, consentimiento claro, controles para detener ubicación y una evaluación separada antes de compartir ubicaciones entre personas.

## OpenStreetMap

La configuración sin proveedor usa `tile.openstreetmap.org` únicamente como base de demostración y conserva la atribución. No debe usarse para carga masiva, precarga u offline. Antes de lanzar una aplicación con tráfico real, elegí un proveedor de mosaicos adecuado o infraestructura propia y respetá sus condiciones.

## Roadmap

- **V0.1 actual:** regalo + mapa + ubicación + avatar.
- **V0.2:** buscador, resultados, destino y sistema completo de códigos/preguntas.
- **V0.3:** geocoding, geofencing, radios y detección de llegada.
- **V0.4:** routing, ruta, ETA, instrucciones y recálculo.
- **V0.5:** fotos, cartas, canciones y recuerdos desbloqueables.
- **V0.6:** PWA completa, cache controlado y pruebas reales en iPhone.
- **V0.7:** Creator/Admin con autenticación y backend.
- **V1.0:** aventura completa y sorpresa final.

## Decisiones técnicas importantes

- No hay backend en V0.1 porque no es necesario para validar la experiencia principal.
- El mapa es un módulo, no el centro de toda la arquitectura.
- `heading`, `speed` y `altitude` son opcionales y nunca se inventan.
- La primera ubicación centra el mapa; actualizaciones posteriores mueven el avatar sin forzar la cámara.
- El seguimiento no se mantiene en segundo plano en iOS.
- Las pistas secretas de producción deberán validarse en servidor.

## Comandos disponibles

```bash
npm run dev        # servidor de desarrollo
npm run typecheck  # verificación TypeScript
npm run build      # typecheck + build de producción
npm run preview    # previsualizar dist/
```

---

Hecho para convertir lugares y recuerdos en una historia que se pueda vivir. 💗
