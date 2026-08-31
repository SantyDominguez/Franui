import { useEffect, useRef, useState } from "react";
import Strands from "../ui/Strands";

type FinalBotIntroProps = {
  onFinish: () => void;
};

type AudioStep = "idle" | "bot" | "santi" | "finished";

const botAudioPath = `${import.meta.env.BASE_URL}audio/bot-intro.mp4`;
const santiAudioPath = `${import.meta.env.BASE_URL}audio/mensaje-final.mp4`;

export function FinalBotIntro({ onFinish }: FinalBotIntroProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceCreatedRef = useRef(false);

  const [step, setStep] = useState<AudioStep>("idle");
  const [voiceLevel, setVoiceLevel] = useState(0);

  const isSpeaking = step === "bot" || step === "santi";

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      audioContextRef.current?.close();
    };
  }, []);

  async function setupAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.78;
    }

    if (
      !sourceCreatedRef.current &&
      analyserRef.current &&
      audioContextRef.current
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

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
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

  return (
    <section className="final-bot">
      <div className="final-bot__visual" aria-hidden="true">
        <Strands
          colors={["#EC4899", "#620ff0", "#38BDF8"]}
          count={3}
          speed={isSpeaking ? voiceLevel * 1.8 : 0}
          amplitude={isSpeaking ? 0.02 + voiceLevel * 3.5 : 0.02}
          waviness={isSpeaking ? 0.25 + voiceLevel * 2.8 : 0.25}
          thickness={0.42 + voiceLevel * 0.28}
          glow={1.1 + voiceLevel * 1.5}
          taper={3}
          spread={1}
          intensity={isSpeaking ? 0.18 + voiceLevel * 0.65 : 0.14}
          saturation={1.25}
          opacity={0.9}
          scale={1.25}
          glass={false}
          refraction={1}
          dispersion={1}
          glassSize={1}
          hueShift={voiceLevel * 0.2}
        />
      </div>

      <audio ref={audioRef} preload="auto" onEnded={handleEnded} />

      <div className="final-bot__content">
        <p className="final-bot__eyebrow">Mensaje final</p>

        <h1>
          {step === "idle" && "Hola Delfi"}
          {step === "bot" && "El bot tiene algo para decir"}
          {step === "santi" && "Ahora viene Santi"}
          {step === "finished" && "Mensaje escuchado"}
        </h1>

        <p>
          {step === "idle" &&
            "Primero habla el bot, después se reproduce el mensaje sorpresa de Santi."}
          {step === "bot" &&
            "Escuchá este mini mensaje antes de abrir la sorpresa."}
          {step === "santi" && "Este es el mensaje sorpresa de Santi para vos."}
          {step === "finished" && "Ahora sí, podés abrir la sorpresa final."}
        </p>

        <div className={`final-bot__face ${isSpeaking ? "is-speaking" : ""}`}>
          <strong>{step === "santi" ? "SANTI" : "BOT"}</strong>
        </div>

        <div className="final-bot__actions">
          {step === "idle" && (
            <button type="button" onClick={startMessages}>
              Reproducir mensaje
            </button>
          )}

          {step === "finished" && (
            <>
              <button type="button" onClick={startMessages}>
                Repetir mensajes
              </button>

              <button type="button" onClick={onFinish}>
                Abrir sorpresa final
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
