const GOOGLE_MAPS_SCRIPT_ID = "franui-google-maps-script";

let loaderPromise: Promise<typeof google.maps> | null = null;

function resolveLoadedMaps() {
  const maps = window.google?.maps;
  if (!maps?.Map || !maps.marker?.AdvancedMarkerElement) return null;
  return maps;
}

export function loadGoogleMaps(apiKey: string, mapId: string) {
  const loadedMaps = resolveLoadedMaps();
  if (loadedMaps) return Promise.resolve(loadedMaps);
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise<typeof google.maps>((resolve, reject) => {
    if (!apiKey) {
      loaderPromise = null;
      reject(
        new Error(
          "Falta configurar VITE_GOOGLE_MAPS_API_KEY. Agregá la clave de Google Maps y volvé a publicar.",
        ),
      );
      return;
    }

    window.__franuiGoogleMapsReady = () => {
      const maps = resolveLoadedMaps();
      if (!maps) {
        loaderPromise = null;
        reject(new Error("Google Maps respondió, pero no pudo iniciar el mapa interactivo."));
        return;
      }
      resolve(maps);
    };

    const existingScript = document.getElementById(
      GOOGLE_MAPS_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    if (existingScript) return;

    const parameters = new URLSearchParams({
      key: apiKey,
      loading: "async",
      callback: "__franuiGoogleMapsReady",
      libraries: "marker",
      language: "es",
      region: "AR",
      v: "weekly",
      auth_referrer_policy: "origin",
    });
    if (mapId) parameters.set("map_ids", mapId);

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${parameters.toString()}`;
    script.onerror = () => {
      script.remove();
      loaderPromise = null;
      reject(
        new Error(
          "No pudimos descargar Google Maps. Revisá la conexión y las restricciones de la clave.",
        ),
      );
    };
    document.head.append(script);
  });

  return loaderPromise;
}
