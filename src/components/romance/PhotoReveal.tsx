type PhotoRevealProps = {
  src?: string;
  alt: string;
  locked?: boolean;
};

export function PhotoReveal({ src, alt, locked = false }: PhotoRevealProps) {
  return (
    <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/85 bg-[linear-gradient(145deg,#dff4fc,#f8fbfd_48%,#b8c8d2)] shadow-[0_30px_80px_rgba(23,92,132,0.18)]">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full place-items-center p-8 text-center text-primary">
          <div>
            <p className="font-display text-2xl">Tu foto va acá</p>
            <p className="mt-2 max-w-[15rem] text-sm leading-6 text-muted">
              Agregá portada.webp en public/images y cambiala desde projectConfig.ts.
            </p>
          </div>
        </div>
      )}
      {locked && (
        <div className="absolute inset-0 grid place-items-center bg-ink/35 text-white backdrop-blur-md">
          <span className="rounded-full border border-white/30 bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            Bloqueado
          </span>
        </div>
      )}
    </figure>
  );
}
