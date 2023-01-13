import { Game } from "@big5ish/types";
import { faSpinner, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOtherPLayers } from "../hooks/useOtherPlayers";

export const PlayerRating = ({ view, game }: { view: "single" | "common"; game: Game }) => {
  const otherPlayers = useOtherPLayers(game);

  return (
    <>
      <h2 className="text-3xl text-center p-4">How neurotic do you think the other players are?🐥</h2>
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
              <p>Slider here will come.</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
