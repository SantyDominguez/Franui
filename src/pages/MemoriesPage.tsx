import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { MemoryCard } from "../components/romance/MemoryCard";
import type { Memory } from "../types/memory";

const demoMemories: Memory[] = [
  { id: "memory-01", title: "El primer recuerdo", description: "Acá aparecerá una foto y su historia.", isUnlocked: true },
  { id: "memory-02", title: "Un día inolvidable", unlockMissionId: "mission-04", isUnlocked: false },
];

export function MemoriesPage() {
  return (
    <>
      <Header title="Nuestros recuerdos" />
      <PageContainer className="pt-5">
        <p className="mb-6 max-w-lg text-sm leading-6 text-muted">
          Esta galería es una muestra visual. El desbloqueo real de fotos, cartas y canciones llega en V0.5.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {demoMemories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)}
        </div>
      </PageContainer>
    </>
  );
}
