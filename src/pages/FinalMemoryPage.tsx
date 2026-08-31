import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { VoiceStrands } from "../components/final/VoiceStrands";
import { useState } from "react";
import { FinalBotIntro } from "../components/final/FinalBotIntro";



export function FinalMemoryPage() {
    const [showSurprise, setShowSurprise] = useState(false);
  return (
    <>
      <Header title="Recuerdo final" />

      <PageContainer className="pt-5">
        <section className="rounded-[1.7rem] border border-white/70 bg-white/70 p-6 shadow-[0_18px_50px_rgba(120,47,88,0.12)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Sorpresa final
          </p>

          <h1 className="mt-3 font-display text-3xl text-ink">
            Delfi, llegaste al final
          </h1>

          <VoiceStrands />

          <p className="mt-3 text-sm leading-6 text-muted">
            Bienvenida a Trixie mi asistente personal.
          </p>
        </section>
      </PageContainer>
    </>
  );
}