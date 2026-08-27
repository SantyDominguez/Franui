import { useEffect, useMemo, useState } from "react";

const SECOND = 1_000;

export type IntroUnlockState = {
  configured: boolean;
  configurationError: boolean;
  unlocked: boolean;
  unlockDate: Date | null;
  remainingMs: number;
};

export function useIntroUnlock(unlockAt: string): IntroUnlockState {
  const cleanValue = unlockAt.trim();
  const unlockTimestamp = useMemo(() => {
    if (!cleanValue) return null;
    const timestamp = Date.parse(cleanValue);
    return Number.isNaN(timestamp) ? Number.NaN : timestamp;
  }, [cleanValue]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (unlockTimestamp === null || Number.isNaN(unlockTimestamp) || now >= unlockTimestamp) return;
    const refresh = () => setNow(Date.now());
    const intervalId = window.setInterval(refresh, SECOND);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [now, unlockTimestamp]);

  const configured = cleanValue.length > 0;
  const configurationError = configured && Number.isNaN(unlockTimestamp);
  const validTimestamp = typeof unlockTimestamp === "number" && Number.isFinite(unlockTimestamp);
  const unlocked = !configured || (validTimestamp && now >= unlockTimestamp);

  return {
    configured,
    configurationError,
    unlocked,
    unlockDate: validTimestamp ? new Date(unlockTimestamp) : null,
    remainingMs: validTimestamp ? Math.max(0, unlockTimestamp - now) : 0,
  };
}
