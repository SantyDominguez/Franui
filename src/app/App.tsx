import { useCallback, useState } from "react";
import { IntroScreen } from "../components/layout/IntroScreen";
import { AppRouter } from "./router";
import { AdventureAnimationOverlay } from "../components/adventure/AdventureAnimationOverlay";
import { AppProviders } from "./providers";
import "../App.css";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const completeIntro = useCallback(() => setShowIntro(false), []);

  return (
    <AppProviders>
      {showIntro && <IntroScreen onComplete={completeIntro} />}
      <AppRouter />
      <AdventureAnimationOverlay />
    </AppProviders>
  );
}
