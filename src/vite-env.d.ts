/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_STYLE_URL?: string;
  readonly VITE_GEOCODING_URL?: string;
  readonly VITE_ROUTING_URL?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
