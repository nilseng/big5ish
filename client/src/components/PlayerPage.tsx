import { useParams } from "react-router-dom";
import { PlayerList } from "./PlayerList";

export const PlayerPage = () => {
  const { gameId } = useParams();

  return (
    <>
      <p className="text-xl font-bold text-white">Waiting for the game to start...</p>
      {gameId && <PlayerList gameId={gameId} />}
    </>
  );
};
