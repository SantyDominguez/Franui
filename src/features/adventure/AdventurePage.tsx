import { ArrowRight, LockKeyhole, Map, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Header } from "../../components/layout/Header";
import { PageContainer } from "../../components/layout/PageContainer";
import { getMissions, getMissionStatus } from "../../services/adventure/missionService";
import { useAdventureStore } from "../../stores/adventureStore";
import { MissionCard } from "./MissionCard";
import { MissionProgress } from "./MissionProgress";
import { MissionUnlock } from "./MissionUnlock";

export function AdventurePage() {
  const allMissions = useMemo(() => getMissions(), []);
  const firstMission = allMissions[0];
  const { completedMissionIds, introSeen, completeMission, markIntroSeen, resetProgress } =
    useAdventureStore();
  const [clueOpen, setClueOpen] = useState(introSeen);
  const firstCompleted = completedMissionIds.includes(firstMission.id);

  const openClue = () => {
    setClueOpen(true);
    markIntroSeen();
  };

  return (
    <>
      <Header title="La aventura" />
      <PageContainer className="pt-5">
        <section className="relative overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(145deg,#fff8f4,#f5e2e8)] p-6 shadow-[0_28px_80px_rgba(98,52,69,0.11)] sm:p-8">
          <div className="absolute -right-16 -top-20 size-48 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          {!clueOpen ? (
            <div className="relative py-8 text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-[2rem] bg-primary text-white shadow-xl shadow-primary/25">
                <LockKeyhole size={30} aria-hidden="true" />
              </span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-primary">Primera pista</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink">¿Empezamos?</h1>
              <p className="mx-auto mt-4 max-w-sm text-pretty text-base leading-7 text-muted">
                Hay algo preparado para vos. No voy a hacer que sea tan fácil encontrarlo.
              </p>
              <Button size="lg" className="mt-7" onClick={openClue}>
                <Sparkles size={19} aria-hidden="true" /> Abrir primera pista
              </Button>
            </div>
          ) : (
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {firstMission.content.eyebrow}
              </p>
              <h1 className="mt-3 text-balance font-display text-4xl leading-tight text-ink">
                {firstMission.title}
              </h1>
              <p className="mt-5 text-pretty text-lg leading-8 text-ink/80">{firstMission.content.clue}</p>
              <div className="mt-7">
                <MissionUnlock
                  mission={firstMission}
                  completed={firstCompleted}
                  onComplete={() => completeMission(firstMission.id)}
                />
              </div>
              {firstCompleted && (
                <Link
                  to="/map"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-strong"
                >
                  <Map size={18} aria-hidden="true" /> Probar el mapa <ArrowRight size={18} aria-hidden="true" />
                </Link>
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
                setClueOpen(false);
              }}
            >
              <RotateCcw size={15} aria-hidden="true" /> Reiniciar demo
            </Button>
          </div>
          <div className="space-y-3">
            {allMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                status={getMissionStatus(mission, completedMissionIds)}
              />
            ))}
          </div>
        </section>
      </PageContainer>
    </>
  );
}
