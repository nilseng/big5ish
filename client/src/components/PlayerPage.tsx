import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { useParams } from "react-router-dom";
import { PlayerList } from "./PlayerList";

const gameQuery = gql`
  query game($gameId: ID!) {
    game(gameId: $gameId) {
      status
    }
  }
`;

export const PlayerPage = () => {
  const { gameId } = useParams();

  const { data } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });

  return (
    <>
      {gameId && data?.game?.status === "CREATED" && (
        <>
          <p className="text-xl font-bold text-white">Waiting for the game to start...</p>
          <PlayerList gameId={gameId} />
        </>
      )}
      {gameId && data?.game?.status === "STARTED" && <p className="text-white">Game started!</p>}
    </>
  );
};
