import { useCallback, useState } from "react";
import { AdventureMusic } from "../components/audio/AdventureMusic";
import { IntroScreen } from "../components/layout/IntroScreen";
import { RecordingReminder } from "../components/layout/RecordingReminder";
import { AppRouter } from "./router";
import { AppProviders } from "./providers";
import "../App.css";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRecordingReminder, setShowRecordingReminder] = useState(false);

  const completeIntro = useCallback(() => {
    setShowIntro(false);
    setShowRecordingReminder(true);
  }, []);

  const completeRecordingReminder = useCallback(() => {
    setShowRecordingReminder(false);
  }, []);

  return (
    <AppProviders>
      <AdventureMusic />
      {showIntro && <IntroScreen onComplete={completeIntro} />}
      {showRecordingReminder && (
        <RecordingReminder onComplete={completeRecordingReminder} />
      )}
      <AppRouter />
    </AppProviders>
  );
}
