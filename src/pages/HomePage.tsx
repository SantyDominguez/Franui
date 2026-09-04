import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DriverReveal } from "../components/driver/DriverReveal";
import { LoveMessage } from "../components/romance/LoveMessage";
import { PhotoReveal } from "../components/romance/PhotoReveal";
import { projectConfig } from "../data/projectConfig";

type SpotifyController = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: {
      uri: string;
      width: string;
      height: number;
    },
    callback: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (iframeApi: SpotifyIframeApi) => void;
  }
}

/*
  Ejemplo de enlace:

  https://open.spotify.com/playlist/37i9dQZF1DX...

  El ID es todo lo que aparece después de /playlist/
  y antes del signo ? si lo hubiera.
*/

const SPOTIFY_PLAYLIST_URL =
  "https://open.spotify.com/playlist/4xPWOwetrfaacRJJz8X1KB?si=8AaMTM4uSkqgBGH23hIfJw&utm_source=copy-link&pi=ZGyoeQwyRTem8";

export function HomePage() {
  const navigate = useNavigate();

  const [showDriverReveal, setShowDriverReveal] = useState(false);
  const [spotifyReady, setSpotifyReady] = useState(false);

  const spotifyControllerRef = useRef<SpotifyController | null>(null);

  useEffect(() => {
    let componentMounted = true;

    window.onSpotifyIframeApiReady = (iframeApi) => {
      const spotifyElement = document.getElementById("spotify-player");

      if (!spotifyElement || !componentMounted) {
        return;
      }

      iframeApi.createController(
        spotifyElement,
        {
          uri: SPOTIFY_PLAYLIST_URL,
          width: "100%",
          height: 152,
        },
        (controller) => {
          if (!componentMounted) {
            return;
          }

          spotifyControllerRef.current = controller;
          setSpotifyReady(true);
        },
      );
    };

    const existingScript = document.querySelector(
      'script[src="https://open.spotify.com/embed/iframe-api/v1"]',
    );

    if (!existingScript) {
      const spotifyScript = document.createElement("script");

      spotifyScript.src = "https://open.spotify.com/embed/iframe-api/v1";

      spotifyScript.async = true;

      document.body.appendChild(spotifyScript);
    }

    return () => {
      componentMounted = false;
      spotifyControllerRef.current = null;
    };
  }, []);

  const startSearch = () => {
    spotifyControllerRef.current?.play();
    setShowDriverReveal(true);
  };

  const continueToAdventure = () => {
    setShowDriverReveal(false);
    navigate("/adventure");
  };

  return (
    <>
      <main className="relative min-h-dvh overflow-hidden bg-background px-5 pb-10 pt-[calc(1.25rem_+_env(safe-area-inset-top))]">
        <div
          className="pointer-events-none absolute -left-28 top-10 size-72 rounded-full bg-secondary/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-24 bottom-20 size-80 rounded-full bg-primary/12 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid min-h-[calc(100dvh_-_4rem)] w-full max-w-5xl items-center gap-10 py-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="mb-8 inline-flex items-center rounded-xl border border-white/85 bg-white/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-[0_10px_30px_rgba(35,98,132,0.1)] backdrop-blur">
              Para {projectConfig.recipientName}
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
              <button
                type="button"
                disabled={!spotifyReady}
                className="button-luminous inline-flex min-h-14 items-center justify-center px-7 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
                onClick={startSearch}
              >
                {spotifyReady ? "Empezar búsqueda" : "Cargando música..."}
              </button>

              <Link
                to="/map"
                className="button-silver inline-flex min-h-14 items-center justify-center px-7 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Ver mapa
              </Link>
            </div>

            <div className="mt-5 w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_15px_40px_rgba(23,110,166,0.12)]">
              <div id="spotify-player" />
            </div>

            <p className="mt-7 max-w-xl text-sm leading-6 text-muted">
              Tu ubicación se usa solamente mientras el mapa está abierto y no
              se guarda en esta versión.
            </p>

            <div className="mt-10">
              <LoveMessage signature={projectConfig.senderName}>
                “Quiero que sepas que no es solo un mapa, o un software, es la
                forma que tengo de mostrarte todos los días lo que me esfuerzo
                por vos”
              </LoveMessage>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
            <div className="relative rotate-[1.5deg]">
              <div
                className="absolute -inset-3 -rotate-3 rounded-[2.2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.82),rgba(184,200,210,.42))] shadow-[0_24px_70px_rgba(23,110,166,0.14)]"
                aria-hidden="true"
              />

              <PhotoReveal
                src={projectConfig.coverImage || undefined}
                alt="Nuestra foto de portada"
              />

              <div className="absolute -bottom-5 -left-4 rotate-[-3deg] rounded-2xl border border-white/85 bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(225,236,242,.94))] px-5 py-3 shadow-xl backdrop-blur">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                  Mira qué linda foto
                </p>

                <p className="mt-1 font-display text-lg text-ink">
                  {projectConfig.specialDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showDriverReveal ? (
        <DriverReveal
          carImage={`${import.meta.env.BASE_URL}${projectConfig.driverReveal.carImage}`}
          driverImage={
            projectConfig.driverReveal.driverImage
              ? `${import.meta.env.BASE_URL}${projectConfig.driverReveal.driverImage}`
              : undefined
          }
          onComplete={continueToAdventure}
        />
      ) : null}
    </>
  );
}
