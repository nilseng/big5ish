import { Game } from "@big5ish/types";
import { faSpinner, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
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
        <div className="grid grid-cols-2 gap-6 place-items-center p-6">
          {game.players.map((player) => (
            <Fragment key={player.id}>
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                <p className="text-xs text-center pt-2">{player.nickname}</p>
              </div>
              <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl`} icon={faSpinner} />
            </Fragment>
          ))}
        </div>
      )}
      {view === "single" && otherPlayers && (
        <div className="grid grid-cols-3 gap-6 p-6">
          {otherPlayers.map((player) => (
            <Fragment key={player.id}>
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                <p className="text-xs pt-2">{player.nickname}</p>
              </div>
              <input
                className="col-span-2"
                id={`range-${player.id}`}
                type={"range"}
                min={1}
                max={5}
                step={1}
                defaultValue={3}
              />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
