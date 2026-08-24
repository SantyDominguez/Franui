import { Camera, LockKeyhole } from "lucide-react";

type PhotoRevealProps = {
  src?: string;
  alt: string;
  locked?: boolean;
};

export function PhotoReveal({ src, alt, locked = false }: PhotoRevealProps) {
  return (
    <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,#f2dfe5,#f8eee9_52%,#dfbbc8)] shadow-[0_30px_80px_rgba(98,52,69,0.16)]">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full place-items-center p-8 text-center text-primary">
          <div>
            <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-white/75 shadow-lg">
              <Camera size={28} aria-hidden="true" />
            </span>
            <p className="font-display text-2xl">Tu foto va acá</p>
            <p className="mt-2 max-w-[15rem] text-sm leading-6 text-muted">
              Agregá portada.webp en public/images y cambiala desde projectConfig.ts.
            </p>
          </div>
        </div>
      )}
      {locked && (
        <div className="absolute inset-0 grid place-items-center bg-ink/35 text-white backdrop-blur-md">
          <span className="grid size-16 place-items-center rounded-full border border-white/30 bg-white/15">
            <LockKeyhole size={26} aria-hidden="true" />
          </span>
        </div>
      )}
    </figure>
  );
}
