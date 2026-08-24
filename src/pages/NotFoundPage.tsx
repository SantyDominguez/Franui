import { ArrowLeft, HeartCrack } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background p-6 text-center">
      <div>
        <HeartCrack className="mx-auto text-primary" size={42} />
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Error 404</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Esta pista no existe</h1>
        <p className="mt-3 text-muted">Volvamos al comienzo antes de perdernos.</p>
        <Link className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-white" to="/">
          <ArrowLeft size={18} /> Volver al inicio
        </Link>
      </div>
    </main>
  );
}
