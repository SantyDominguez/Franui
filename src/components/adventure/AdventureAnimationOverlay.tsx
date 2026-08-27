import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { projectConfig } from "../../data/projectConfig";
import { getMissionById, getNextMission } from "../../services/adventure/missionService";
import { useAdventureStore } from "../../stores/adventureStore";

export function AdventureAnimationOverlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const animation = useAdventureStore((state) => state.activeAnimation);
  const closeAnimation = useAdventureStore((state) => state.closeAnimation);
  const setActiveMission = useAdventureStore((state) => state.setActiveMission);

  const mission = useMemo(
    () => (animation ? getMissionById(animation.missionId) : undefined),
    [animation],
  );
  const nextMission = mission ? getNextMission(mission) : undefined;
  const isArrival = animation?.kind === "arrival";
  const avatar = `${import.meta.env.BASE_URL}${projectConfig.animationAvatarImage}`;
  const placeImage = mission?.content.image
    ? `${import.meta.env.BASE_URL}${mission.content.image}`
    : "";

  useEffect(() => {
    if (!animation) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [animation]);

  if (!animation || !mission) return null;

  const title = isArrival
    ? "¡SUPER CALIENTE!"
    : mission.order === 5
      ? "¡Llegaste al final!"
      : `¡Lograste la ${ordinal(mission.order)} pista!`;

  const eyebrow = isArrival
    ? `Pista ${String(mission.order).padStart(2, "0")} · Detector en vivo`
    : "Pista desbloqueada";

  const close = () => {
    closeAnimation();
    if (!isArrival && nextMission) {
      setActiveMission(nextMission.id);
      if (location.pathname !== "/adventure") navigate("/adventure");
    }
  };

  return (
    <div className="adventure-animation" role="dialog" aria-modal="true" aria-label={title}>
      <div className="adventure-animation__noise" aria-hidden="true" />
      <div className="adventure-animation__glow adventure-animation__glow--one" aria-hidden="true" />
      <div className="adventure-animation__glow adventure-animation__glow--two" aria-hidden="true" />

      <div className="adventure-animation__content">
        <p className="adventure-animation__eyebrow">{eyebrow}</p>
        <h2 className="adventure-animation__title">{title}</h2>

        <div className="adventure-animation__stage" aria-hidden="true">
          <div className="adventure-animation__burst" />
          <img className="adventure-animation__delfi" src={avatar} alt="" />
          <svg className="adventure-animation__arrow" viewBox="0 0 320 160" fill="none">
            <path
              className="adventure-animation__arrow-path"
              d="M22 126 C90 28 178 35 248 92"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              className="adventure-animation__arrow-head"
              d="M236 63 L278 99 L224 112"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {isArrival && placeImage ? (
            <img className="adventure-animation__target adventure-animation__target--place" src={placeImage} alt="" />
          ) : (
            <div className="adventure-animation__target adventure-animation__target--question">?</div>
          )}
        </div>

        <p className="adventure-animation__message">
          {isArrival
            ? mission.content.arrivalMessage || "La señal te llevó hasta acá."
            : nextMission
              ? "La siguiente pista ya está lista."
              : mission.content.rewardMessage || "Lo lograste."}
        </p>

        <button type="button" className="adventure-animation__button" onClick={close}>
          {isArrival ? "Ver la pista" : nextMission ? "Descubrir siguiente pista" : "Continuar"}
        </button>
      </div>
    </div>
  );
}

function ordinal(number: number) {
  const values = ["", "primera", "segunda", "tercera", "cuarta", "quinta"];
  return values[number] || `${number}ª`;
}
