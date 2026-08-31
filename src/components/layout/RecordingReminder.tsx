import { Camera, Smartphone, Video } from "lucide-react";

type RecordingReminderProps = {
  onComplete: () => void;
};

export function RecordingReminder({ onComplete }: RecordingReminderProps) {
  return (
    <div className="recording-reminder" role="dialog" aria-modal="true">
      <div className="recording-reminder__orb" aria-hidden="true" />

      <section className="recording-reminder__card">
        <div className="recording-reminder__phone" aria-hidden="true">
          <Smartphone className="recording-reminder__phone-icon" />
          <div className="recording-reminder__screen">
            <div className="recording-reminder__rec">
              <span />
              REC
            </div>
            <div className="recording-reminder__vertical-frame">
              <Video />
            </div>
            <div className="recording-reminder__timer">00:00:03</div>
          </div>
        </div>

        <div className="recording-reminder__copy">
          <p className="recording-reminder__eyebrow">Antes de empezar</p>

          <h1>
            Quiero que grabes
            <span>esta búsqueda</span>
          </h1>

          <p>
            Grabá todo el recorrido, o las partes que sientas importantes,
            lindas o divertidas.
          </p>

          <div className="recording-reminder__format">
            <Camera size={18} />
            <span>Formato vertical, sí o sí.</span>
          </div>

          <p className="recording-reminder__luck">Suerte con la búsqueda 💘</p>

          <button type="button" onClick={onComplete}>
            Estoy lista
          </button>
        </div>
      </section>
    </div>
  );
}
