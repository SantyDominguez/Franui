import { Heart, Home, Map, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/adventure", label: "Aventura", icon: Sparkles },
  { to: "/map", label: "Mapa", icon: Map },
  { to: "/memories", label: "Recuerdos", icon: Heart },
  { to: "/settings", label: "Ajustes", icon: Settings },
];

export function Navigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-2xl border-t border-white/70 bg-surface/92 px-2 pb-[calc(0.45rem_+_env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_40px_rgba(69,35,47,0.09)] backdrop-blur-xl"
      aria-label="Navegación principal"
    >
      <ul className="grid grid-cols-5 gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.65rem] font-semibold transition",
                  isActive ? "bg-primary-soft text-primary" : "text-muted hover:bg-white/70 hover:text-ink",
                )
              }
            >
              <Icon size={19} strokeWidth={2} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
