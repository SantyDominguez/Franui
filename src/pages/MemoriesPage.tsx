import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { useAdventureStore } from "../stores/adventureStore";

export function MemoriesPage() {
  const navigate = useNavigate();

  const completedMissionIds = useAdventureStore(
    (state) => state.completedMissionIds,
  );

  const adventureFinished = completedMissionIds.includes("mission-05");
  // Cuando quieras bloquearlo de nuevo, usá:
  // const adventureFinished = completedMissionIds.includes("mission-05");

  return (
    <>
      <Header title="Recuerdo final" />

      <PageContainer className="pt-5">
        {!adventureFinished ? (
          <section className="rounded-[1.7rem] border border-white/70 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(120,47,88,0.12)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Bloqueado
            </p>

            <h1 className="mt-3 font-display text-3xl text-ink">
              Todavía falta terminar la aventura
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
              Este recuerdo se desbloquea recién cuando completes la última
              pista.
            </p>
          </section>
        ) : (
          <section className="rounded-[1.7rem] border border-white/70 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(120,47,88,0.12)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Desbloqueado
            </p>

            <h1 className="mt-3 font-display text-3xl text-ink">
              Hay una última sorpresa
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
              Terminaste la búsqueda. Tocá el botón para abrir el recuerdo
              final.
            </p>

            <button
              type="button"
              onClick={() => navigate("/recuerdo-final")}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_16px_35px_rgba(224,76,139,0.28)] transition hover:-translate-y-0.5 hover:bg-primary-strong"
            >
              Abrir recuerdo final
            </button>
          </section>
        )}
      </PageContainer>
    </>
  );
}
