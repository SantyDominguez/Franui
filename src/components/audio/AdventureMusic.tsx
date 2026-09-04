import { useCallback, useEffect, useRef } from "react";

export const ADVENTURE_MUSIC_START_EVENT = "adventure-music:start";

const firstTrack = `${import.meta.env.BASE_URL}audio/eoo.mp3`;
const otherTracks = [
  `${import.meta.env.BASE_URL}audio/soleao.mp3`,
  `${import.meta.env.BASE_URL}audio/la-curiosidad.mp3`,
  `${import.meta.env.BASE_URL}audio/hey-mor.mp3`,
];

function shuffledTracks(tracks: string[]) {
  const result = [...tracks];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

export function AdventureMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingTracksRef = useRef<string[]>([]);

  const playNextTrack = useCallback(() => {
    const audio = audioRef.current;
    const nextTrack = pendingTracksRef.current.shift();

    if (!audio || !nextTrack) return;

    audio.src = nextTrack;
    audio.load();
    void audio.play().catch(() => {
      // La primera reproducción nace de un toque real. Si el navegador
      // interrumpe una transición, el reproductor queda listo para reanudar.
    });
  }, []);

  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;
      if (!audio) return;

      pendingTracksRef.current = shuffledTracks(otherTracks);
      audio.currentTime = 0;
      audio.volume = 0.78;
      void audio.play().catch(() => {
        // El evento se dispara directamente desde el botón, por lo que los
        // navegadores normales permiten reproducirlo con sonido.
      });
    };

    window.addEventListener(ADVENTURE_MUSIC_START_EVENT, startMusic);
    return () => window.removeEventListener(ADVENTURE_MUSIC_START_EVENT, startMusic);
  }, []);

  return (
    <audio
      ref={audioRef}
      src={firstTrack}
      preload="auto"
      onEnded={playNextTrack}
      aria-hidden="true"
    />
  );
}
