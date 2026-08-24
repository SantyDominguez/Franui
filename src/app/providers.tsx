import type { ReactNode } from "react";
import { HashRouter } from "react-router-dom";

export function AppProviders({ children }: { children: ReactNode }) {
  // El hash mantiene todas las rutas funcionando en hosting estático
  // como GitHub Pages, incluso al recargar una pantalla interna.
  return <HashRouter>{children}</HashRouter>;
}
