import { useEffect, useRef, useState } from "react";
import Strands from "../ui/Strands";

type AudioStep = "idle" | "bot" | "santi" | "finished";

const botAudioPath = `${import.meta.env.BASE_URL}audio/bot-intro.mp4`;
const santiAudioPath = `${import.meta.env.BASE_URL}audio/mensaje-final.mp4`;

export function VoiceStrands() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceCreatedRef = useRef(false);

  const [step, setStep] = useState<AudioStep>("idle");
  const [voiceLevel, setVoiceLevel] = useState(0);

  const isPlaying = step === "bot" || step === "santi";

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      audioContextRef.current?.close();
    };
  }, []);

  async function setupAudio() {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.78;

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
    }

    if (
      !sourceCreatedRef.current &&
      audioContextRef.current &&
      analyserRef.current
    ) {
      const source = audioContextRef.current.createMediaElementSource(audio);

      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      sourceCreatedRef.current = true;
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
  }

  function startVisualizer() {
    const analyser = analyserRef.current;

    if (!analyser) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);

      const average =
        data.reduce((total, value) => total + value, 0) / data.length;

      const normalized = Math.min(1, average / 115);
      const activeVoiceLevel = normalized > 0.08 ? normalized : 0;

      setVoiceLevel(activeVoiceLevel);

      animationRef.current = requestAnimationFrame(tick);
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    tick();
  }

  async function playAudio(src: string, nextStep: AudioStep) {
    const audio = audioRef.current;

    if (!audio) return;

    await setupAudio();

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.load();

    setStep(nextStep);
    startVisualizer();

    await audio.play();
  }

  async function startMessages() {
    await playAudio(botAudioPath, "bot");
  }

  async function handleEnded() {
    if (step === "bot") {
      await playAudio(santiAudioPath, "santi");
      return;
    }

    if (step === "santi") {
      setStep("finished");
      setVoiceLevel(0);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }

  function pauseMessages() {
    const audio = audioRef.current;

    audio?.pause();

    setStep("idle");
    setVoiceLevel(0);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }

  return (
    <section className="voice-strands">
      <div className="voice-strands__visual" aria-hidden="true">
        <Strands
          colors={["#066ef7", "#0c48ee", "#737676"]}
          count={3}
          speed={isPlaying ? voiceLevel * 1.8 : 0}
          amplitude={isPlaying ? 0.02 + voiceLevel * 3.5 : 0.01}
          waviness={isPlaying ? 0.25 + voiceLevel * 2.8 : 0.25}
          thickness={0.45 + voiceLevel * 0.28}
          glow={1.2 + voiceLevel * 1.5}
          taper={3}
          spread={1}
          intensity={isPlaying ? 0.18 + voiceLevel * 0.7 : 0.14}
          saturation={1.25}
          opacity={0.9}
          scale={1.25}
          glass={false}
          refraction={1}
          dispersion={1}
          glassSize={1}
          hueShift={voiceLevel * 0.18}
        />
      </div>

      <audio ref={audioRef} preload="auto" onEnded={handleEnded} />

      <button
        type="button"
        className="voice-strands__button"
        onClick={
          isPlaying
            ? pauseMessages
            : step === "finished"
              ? startMessages
              : startMessages
        }
      >
        {step === "idle" && "Reproducir mensaje"}
        {step === "bot" && "Pausar bot"}
        {step === "santi" && "Pausar mensaje de Santi"}
        {step === "finished" && "Repetir mensaje"}
      </button>
    </section>
  );
}
