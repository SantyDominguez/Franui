import { RotateCcw, ShieldCheck } from "lucide-react";
import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { useAdventureStore } from "../stores/adventureStore";

export function SettingsPage() {
  const resetProgress = useAdventureStore((state) => state.resetProgress);

  return (
    <>
      <Header title="Configuración" />
      <PageContainer className="space-y-4 pt-5">
        <section className="rounded-[1.7rem] border border-white/75 bg-white/70 p-6">
          <ShieldCheck className="text-success" size={26} />
          <h1 className="mt-4 font-display text-3xl text-ink">Privacidad primero</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            V0.2 usa tu ubicación únicamente para calcular frío o calor en el dispositivo. No guarda coordenadas ni las envía a un backend.
          </p>
        </section>
        <section className="rounded-[1.7rem] border border-white/75 bg-white/70 p-6">
          <h2 className="font-display text-2xl text-ink">Demo</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Borrá el progreso local para volver a probar las tres pistas y sus códigos.</p>
          <Button variant="secondary" className="mt-4" onClick={resetProgress}>
            <RotateCcw size={17} /> Reiniciar aventura
          </Button>
        </section>
      </PageContainer>
    </>
  );
}
