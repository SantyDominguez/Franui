import { AlertTriangle, LoaderCircle, LocateFixed, ShieldCheck } from "lucide-react";
import { useCallback, useState } from "react";
import { Header } from "../components/layout/Header";
import { Map } from "../components/map/Map";
import { Button } from "../components/ui/Button";
import { useGeolocation } from "../features/location/useGeolocation";
import { formatAccuracy } from "../features/location/locationUtils";
import { useUserStore } from "../stores/userStore";

export function MapPage() {
  const { status, location, error, startTracking } = useGeolocation({ autoStart: true });
  const avatar = useUserStore((state) => state.user.avatar);
  const [mapError, setMapError] = useState("");
  const handleMapError = useCallback((message: string) => setMapError(message), []);
  const waiting = status === "idle" || status === "requesting";
  const failed = status === "denied" || status === "unavailable" || status === "error";

  return (
    <div className="flex h-[calc(100dvh_-_4.8rem_-_env(safe-area-inset-bottom))] flex-col overflow-hidden">
      <Header title="Tu mapa" compact />
      <main className="relative mx-auto min-h-0 w-full max-w-2xl flex-1 px-3 pb-2">
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_24px_70px_rgba(98,52,69,0.13)]">
          <Map
            location={location}
            avatar={avatar}
            onRequestLocation={startTracking}
            onMapError={handleMapError}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-3">
            {waiting && (
              <div className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-white/80 bg-white/92 p-4 shadow-xl backdrop-blur">
                <LoaderCircle className="mt-0.5 shrink-0 animate-spin text-primary" size={20} />
                <div>
                  <p className="font-semibold text-ink">Buscando tu ubicación…</p>
                  <p className="mt-1 text-xs leading-5 text-muted">Aceptá el permiso del navegador para mostrar tu avatar.</p>
                </div>
              </div>
            )}

            {failed && (
              <div className="pointer-events-auto rounded-2xl border border-warning/20 bg-white/95 p-4 shadow-xl backdrop-blur">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 shrink-0 text-warning" size={20} />
                  <div>
                    <p className="font-semibold text-ink">No pudimos ubicarte</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{error?.message}</p>
                  </div>
                </div>
                <Button className="mt-3" size="sm" onClick={startTracking}>
                  <LocateFixed size={16} /> Intentar de nuevo
                </Button>
              </div>
            )}

            {status === "available" && location && (
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/92 px-4 py-2 text-xs font-semibold text-ink shadow-lg backdrop-blur">
                <span className="size-2 rounded-full bg-success shadow-[0_0_0_4px_rgba(61,138,105,0.14)]" />
                En vivo · {formatAccuracy(location.accuracy)}
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 z-20 max-w-[15rem] rounded-2xl border border-white/70 bg-white/88 p-3 text-[0.68rem] leading-5 text-muted shadow-lg backdrop-blur">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 shrink-0 text-success" size={15} />
              La posición no se envía ni se guarda. El seguimiento termina al cerrar esta pantalla.
            </p>
          </div>
        </div>
        {mapError && (
          <p className="sr-only" role="status" aria-live="polite">
            El mapa informó: {mapError}
          </p>
        )}
      </main>
    </div>
  );
}
