import { Game } from "@big5ish/types";
import { faSpinner, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useOtherPLayers } from "../hooks/useOtherPlayers";
import { ErrorMsg } from "./ErrorMsg";

export const PlayerRating = ({ view, game }: { view: "single" | "common"; game: Game }) => {
  const otherPlayers = useOtherPLayers(game);
  const currentStep = useCurrentStep({ game: game });

  if (currentStep?.type !== "playerRating") return <ErrorMsg msg={"Troubles 😥⚙️"} />;

  return (
    <>
      <h2 className="text-3xl text-center p-4">{currentStep?.statement}</h2>
      {view === "common" && (
        <div className="flex flex-col justify-center items-center">
          {game.players.map((player) => (
            <div key={player.id} className="flex items-center p-6">
              <div className="flex flex-col items-center px-4">
                <FontAwesomeIcon icon={faUserNinja} size={"2x"} /> <p className="text-xs pt-2">{player.nickname}</p>
              </div>
              <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl`} icon={faSpinner} />
            </div>
          ))}
        </div>
      )}
      {view === "single" && otherPlayers && (
        <div className="flex flex-col justify-center items-center">
          {otherPlayers.map((player) => (
            <div key={player.id} className="flex items-center p-6">
              <div className="flex flex-col items-center px-4">
                <FontAwesomeIcon icon={faUserNinja} size={"2x"} /> <p className="text-xs pt-2">{player.nickname}</p>
              </div>
              <input id={`range-${player.id}`} type={"range"} min={1} max={5} step={1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
