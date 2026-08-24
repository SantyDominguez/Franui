import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // MapLibre 6 carga su worker como un módulo separado. Excluir el paquete
  // evita que el optimizador de Vite 8 genere una ruta temporal inválida.
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
});
