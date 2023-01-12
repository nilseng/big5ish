import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { PlayerList } from "../components/PlayerList";

const gameQuery = gql`
  query game($gameId: ID!) {
    game(gameId: $gameId) {
      status
    }
  }
`;

export const PlayerPage = () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });

  if (loading) return <FontAwesomeIcon className={`animate-spin text-gray-200`} icon={faSpinner} />;

  if (error || !gameId || !data?.game) {
    return <p className="text-xl font-bold text-white">Oh, hell, something went wrong...</p>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {data.game.status === "CREATED" && (
        <>
          <p className="text-xl font-bold text-white">Waiting for the game to start...</p>
          <PlayerList gameId={gameId} />
        </>
      )}
      {data.game.status === "STARTED" && <p className="text-white">Game started!</p>}
    </div>
  );
};
