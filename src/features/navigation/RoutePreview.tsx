import type { NavigationRoute } from "../../types/route";
import { formatDistance, formatDuration } from "../../lib/utils";

type RoutePreviewProps = {
  route: NavigationRoute;
};

export function RoutePreview({ route }: RoutePreviewProps) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl bg-white/80 p-4">
      <span><strong className="block text-ink">{formatDistance(route.distance)}</strong><small className="text-muted">Distancia</small></span>
      <span className="text-right"><strong className="block text-ink">{formatDuration(route.duration)}</strong><small className="text-muted">Tiempo estimado</small></span>
    </div>
  );
}
