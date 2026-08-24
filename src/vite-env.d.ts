/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_GOOGLE_MAPS_MAP_ID?: string;
  readonly VITE_MAP_STYLE_URL?: string;
  readonly VITE_GEOCODING_URL?: string;
  readonly VITE_ROUTING_URL?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
