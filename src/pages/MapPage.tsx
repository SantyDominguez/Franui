import { AlertTriangle, LoaderCircle, LocateFixed, MapPinned, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Map } from "../components/map/Map";
import { Button } from "../components/ui/Button";
import { ProximityPanel } from "../features/adventure/ProximityPanel";
import { formatAccuracy } from "../features/location/locationUtils";
import { useGeolocation } from "../features/location/useGeolocation";
import { useProximity } from "../features/location/useProximity";
import {
  getFirstAvailableMission,
  getMissionById,
  getMissionStatus,
  getNextMission,
} from "../services/adventure/missionService";
import { canUnlockMission } from "../services/adventure/unlockService";
import { useAdventureStore } from "../stores/adventureStore";
import { useUserStore } from "../stores/userStore";

export function MapPage() {
  const navigate = useNavigate();
  const { status, location, error, startTracking } = useGeolocation({ autoStart: true });
  const avatar = useUserStore((state) => state.user.avatar);
  const {
    activeMissionId,
    completedMissionIds,
    completeMission,
    setActiveMission,
  } = useAdventureStore();
  const activeMission = useMemo(() => {
    const requestedMission = activeMissionId ? getMissionById(activeMissionId) : undefined;
    if (
      requestedMission &&
      getMissionStatus(requestedMission, completedMissionIds) !== "locked"
    ) {
      return requestedMission;
    }
    return getFirstAvailableMission(completedMissionIds) || requestedMission;
  }, [activeMissionId, completedMissionIds]);
  const searchArea = activeMission?.searchArea;
  const proximity = useProximity(location, searchArea, activeMission?.id);
  const nextMission = activeMission ? getNextMission(activeMission) : undefined;
  const missionCompleted = Boolean(
    activeMission && completedMissionIds.includes(activeMission.id),
  );
  const [mapError, setMapError] = useState("");
  const [mapRetryKey, setMapRetryKey] = useState(0);
  const handleMapError = useCallback((message: string) => setMapError(message), []);
  const handleMapReady = useCallback(() => setMapError(""), []);
  const waiting = status === "idle" || status === "requesting";
  const failed = status === "denied" || status === "unavailable" || status === "error";

  useEffect(() => {
    if (activeMission && activeMission.id !== activeMissionId) {
      setActiveMission(activeMission.id);
    }
  }, [activeMission, activeMissionId, setActiveMission]);

  const submitCode = (code: string) => {
    if (!activeMission) return false;
    const correct = canUnlockMission(activeMission, { answer: code });
    if (correct) completeMission(activeMission.id);
    return correct;
  };

  const continueAdventure = () => {
    if (nextMission) setActiveMission(nextMission.id);
    navigate("/adventure");
  };

  return (
    <div className="flex h-[calc(100dvh_-_4.8rem_-_env(safe-area-inset-bottom))] flex-col overflow-hidden">
      <Header title="Tu mapa" compact />
      <main className="relative mx-auto min-h-0 w-full max-w-2xl flex-1 px-3 pb-2">
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_24px_70px_rgba(98,52,69,0.13)]">
          <Map
            key={mapRetryKey}
            location={location}
            avatar={avatar}
            onRequestLocation={startTracking}
            onMapError={handleMapError}
            onMapReady={handleMapReady}
            searchArea={searchArea}
            proximityLevel={proximity.level}
            focusKey={activeMission?.id}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 space-y-2 p-3 pr-20">
            {waiting && (
              <div className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-white/80 bg-white/92 p-4 shadow-xl backdrop-blur">
                <LoaderCircle className="mt-0.5 shrink-0 animate-spin text-primary" size={20} />
                <div>
                  <p className="font-semibold text-ink">Buscando tu ubicación…</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Aceptá el permiso para comenzar el juego de frío y calor.
                  </p>
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
                <ShieldCheck className="text-success" size={15} aria-hidden="true" />
                En vivo · {formatAccuracy(location.accuracy)}
              </div>
            )}

            {mapError && (
              <div className="pointer-events-auto rounded-2xl border border-warning/20 bg-white/95 p-4 shadow-xl backdrop-blur">
                <div className="flex items-start gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-warning" size={20} />
                  <div>
                    <p className="font-semibold text-ink">El mapa no terminó de cargar</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{mapError}</p>
                  </div>
                </div>
                <Button
                  className="mt-3"
                  size="sm"
                  onClick={() => {
                    setMapError("");
                    setMapRetryKey((current) => current + 1);
                  }}
                >
                  <LocateFixed size={16} /> Recargar mapa
                </Button>
              </div>
            )}
          </div>

          {activeMission && searchArea ? (
            <ProximityPanel
              mission={activeMission}
              descriptor={proximity.descriptor}
              completed={missionCompleted}
              hasNextMission={Boolean(nextMission)}
              onSubmitCode={submitCode}
              onContinue={continueAdventure}
            />
          ) : (
            <section className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] border border-b-0 border-white/75 bg-white/95 p-6 text-center shadow-[0_-18px_55px_rgba(57,39,45,0.16)] backdrop-blur-xl">
              <MapPinned className="mx-auto text-primary" size={30} />
              <h2 className="mt-3 font-display text-2xl text-ink">Todavía no hay una zona activa</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Abrí una pista para cargar su círculo de búsqueda.
              </p>
              <Link
                to="/adventure"
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white"
              >
                Ir a las pistas
              </Link>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
