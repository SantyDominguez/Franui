import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function AppShell() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <Outlet />
      <Navigation />
    </div>
  );
}
