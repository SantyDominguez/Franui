import { ArrowRight, Heart, Map, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { LoveMessage } from "../components/romance/LoveMessage";
import { PhotoReveal } from "../components/romance/PhotoReveal";
import { projectConfig } from "../data/projectConfig";

export function HomePage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background px-5 pb-10 pt-[calc(1.25rem_+_env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute -left-28 top-10 size-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-20 size-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100dvh_-_4rem)] w-full max-w-5xl items-center gap-10 py-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
            <Heart size={15} className="fill-current" aria-hidden="true" /> Para {projectConfig.recipientName}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.23em] text-primary">
            {projectConfig.homeEyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-[clamp(2.8rem,9vw,5.8rem)] leading-[0.96] tracking-[-0.045em] text-ink">
            {projectConfig.homeTitle}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {projectConfig.homeMessage}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/adventure"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-white shadow-[0_14px_35px_rgba(141,49,84,0.3)] transition hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Sparkles size={19} aria-hidden="true" /> Comenzar aventura <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/map"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-primary/15 bg-white/70 px-7 text-base font-semibold text-primary transition hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Map size={19} aria-hidden="true" /> Ver mapa
            </Link>
          </div>

          <div className="mt-7 flex items-start gap-3 text-sm leading-6 text-muted">
            <ShieldCheck className="mt-0.5 shrink-0 text-success" size={18} aria-hidden="true" />
            <p>Tu ubicación se usa solamente mientras el mapa está abierto y no se guarda en esta versión.</p>
          </div>

          <div className="mt-10">
            <LoveMessage signature={projectConfig.senderName}>
              “No es solo un mapa. Es una forma de volver a encontrarnos en todos nuestros lugares.”
            </LoveMessage>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
          <div className="relative rotate-[1.5deg]">
            <div className="absolute -inset-3 -rotate-3 rounded-[2.2rem] border border-primary/10 bg-white/55 shadow-lg" aria-hidden="true" />
            <PhotoReveal src={projectConfig.coverImage || undefined} alt="Nuestra foto de portada" />
            <div className="absolute -bottom-5 -left-4 rotate-[-4deg] rounded-2xl border border-white/80 bg-white/90 px-5 py-3 shadow-xl backdrop-blur">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">Nuestra fecha</p>
              <p className="mt-1 font-display text-lg text-ink">{projectConfig.specialDate}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
