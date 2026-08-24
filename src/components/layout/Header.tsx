import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { projectConfig } from "../../data/projectConfig";
import { useUserStore } from "../../stores/userStore";

type HeaderProps = {
  title?: string;
  compact?: boolean;
};

export function Header({ title, compact = false }: HeaderProps) {
  const user = useUserStore((state) => state.user);

  return (
    <header className="flex items-center justify-between gap-4 px-5 pb-3 pt-[calc(1rem_+_env(safe-area-inset-top))]">
      <Link to="/" className="group inline-flex min-w-0 items-center gap-3" aria-label="Ir al inicio">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition group-hover:-rotate-3">
          <Heart size={19} className="fill-current" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
            {projectConfig.appName}
          </span>
          {!compact && (
            <span className="block truncate font-display text-xl leading-tight text-ink">
              {title || "Solo nuestro"}
            </span>
          )}
        </span>
      </Link>
      <Avatar src={user.avatar} alt={`Avatar de ${user.name}`} size="sm" />
    </header>
  );
}
