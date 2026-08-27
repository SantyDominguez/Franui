import { ArrowRight, LockKeyhole, Map, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { PageContainer } from "../../components/layout/PageContainer";
import { Button } from "../../components/ui/Button";
import {
  getFirstAvailableMission,
  getMissionById,
  getMissions,
  getMissionStatus,
  getNextMission,
} from "../../services/adventure/missionService";
import { useAdventureStore } from "../../stores/adventureStore";
import { MissionCard } from "./MissionCard";
import { MissionProgress } from "./MissionProgress";
import { MissionUnlock } from "./MissionUnlock";

export function AdventurePage() {
  const allMissions = useMemo(() => getMissions(), []);
  const {
    activeMissionId,
    completedMissionIds,
    revealedMissionIds,
    completeMission,
    revealMission,
    setActiveMission,
    resetProgress,
  } = useAdventureStore();
  const firstAvailable = getFirstAvailableMission(completedMissionIds);
  const initialMission =
    (activeMissionId && getMissionById(activeMissionId)) || firstAvailable || allMissions[0];
  const [selectedMissionId, setSelectedMissionId] = useState(initialMission.id);
  const selectedMission = getMissionById(selectedMissionId) || initialMission;
  const clueOpen = revealedMissionIds.includes(selectedMission.id);
  const missionCompleted = completedMissionIds.includes(selectedMission.id);
  const nextMission = getNextMission(selectedMission);

  const selectMission = (missionId: string) => {
    const mission = getMissionById(missionId);
    if (!mission || getMissionStatus(mission, completedMissionIds) === "locked") return;
    setSelectedMissionId(mission.id);
    setActiveMission(mission.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openClue = () => {
    revealMission(selectedMission.id);
    setActiveMission(selectedMission.id);
  };

  const openNextMission = () => {
    if (!nextMission) return;
    setSelectedMissionId(nextMission.id);
    setActiveMission(nextMission.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header title="La aventura" />
      <PageContainer className="pt-5">
        <section className="steel-surface relative overflow-hidden rounded-[2.2rem] p-6 sm:p-8">
          <div className="absolute -right-16 -top-20 size-48 rounded-full bg-secondary/20 blur-3xl" aria-hidden="true" />
          {!clueOpen ? (
            <div className="relative py-8 text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#0b416c,#55bde4)] text-white shadow-[0_18px_45px_rgba(23,110,166,0.28)]">
                <LockKeyhole size={30} aria-hidden="true" />
              </span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Pista {String(selectedMission.order).padStart(2, "0")}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink">
                {selectedMission.order === 1 ? "¿Empezamos?" : "Una nueva pista te espera"}
              </h1>
              <p className="mx-auto mt-4 max-w-sm text-pretty text-base leading-7 text-muted">
                {selectedMission.description}
              </p>
              <Button size="lg" className="mt-7" onClick={openClue}>
                <Sparkles size={19} aria-hidden="true" /> Abrir pista
              </Button>
            </div>
          ) : (
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {selectedMission.content.eyebrow || `Pista ${selectedMission.order}`}
              </p>
              <h1 className="mt-3 text-balance font-display text-4xl leading-tight text-ink">
                {selectedMission.title}
              </h1>
              <p className="mt-5 text-pretty text-lg leading-8 text-ink/80">
                {selectedMission.content.clue}
              </p>

              {selectedMission.searchArea && !missionCompleted && (
                <Link
                  to="/map"
                  onClick={() => setActiveMission(selectedMission.id)}
                  className="button-luminous mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 px-5 text-base font-semibold"
                >
                  <Map size={19} aria-hidden="true" /> Abrir zona en el mapa
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              )}

              <div className="mt-6">
                <MissionUnlock
                  mission={selectedMission}
                  completed={missionCompleted}
                  onComplete={() => completeMission(selectedMission.id)}
                />
              </div>

              {missionCompleted && nextMission && (
                <Button size="lg" fullWidth className="mt-5" onClick={openNextMission}>
                  <Sparkles size={18} /> Descubrir la siguiente pista
                </Button>
              )}
            </div>
          )}
        </section>

        <div className="mt-6">
          <MissionProgress total={allMissions.length} completed={completedMissionIds.length} />
        </div>

        <section className="mt-8" aria-labelledby="mission-list-title">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 id="mission-list-title" className="font-display text-2xl text-ink">
              El camino
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetProgress();
                setSelectedMissionId(allMissions[0].id);
              }}
            >
              <RotateCcw size={15} aria-hidden="true" /> Reiniciar demo
            </Button>
          </div>
          <div className="space-y-3">
            {allMissions.map((mission) => {
              const status = getMissionStatus(mission, completedMissionIds);
              return (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  status={status}
                  selected={selectedMission.id === mission.id}
                  onSelect={() => selectMission(mission.id)}
                />
              );
            })}
          </div>
        </section>
      </PageContainer>
    </>
  );
}
