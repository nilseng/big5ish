import { gql, useMutation, useQuery } from "@apollo/client";
import { Player } from "@big5ish/types";
import { useNavigate, useParams } from "react-router-dom";
import { NeuButton } from "../components/NeuButton";
import { PlayerList } from "../components/PlayerList";
import { paths } from "../config";

const playersQuery = gql`
  query players($gameId: ID!) {
    players(gameId: $gameId) {
      id
    }
  }
`;

const startGameMutation = gql`
  mutation startGame($gameId: ID!) {
    startGame(gameId: $gameId) {
      id
    }
  }
`;

export const WaitingRoomPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery<{ players: Player[] }, { gameId: string | undefined }>(playersQuery, {
    variables: { gameId },
    pollInterval: 500,
  });

  const [startGame, { error: startGameError }] = useMutation(startGameMutation);

  if (error) return <p>Something is terribly wrong here😭 Please try again🙏</p>;

  return (
    <>
      <p className="text-gray-200">game id</p>
      <h1 className="text-3xl text-gray-50">
        <code>{gameId}</code>
      </h1>
      <NeuButton
        type="colored"
        className="border-4 border-white mt-10"
        textClassName="font-bold text-xl text-gray-50"
        text="PLAY"
        style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
        disabled={!data?.players?.length || data?.players?.length < 2}
        asyncAction={() => startGame({ variables: { gameId } })}
        action={() => navigate(`/game/${gameId}`)}
      />
      {startGameError && <p className="color-red-500">Could not start game</p>}
      <div className="flex flex-col items-center mt-10">
        <p className="text-gray-200 self-start">Go to</p>
        <p className="text-gray-50 my-4">
          <code className="text-xl">big5ish.herokuapp.com{paths.gameIdForm}</code>
        </p>
        <p className="text-gray-200 self-end">on your phone to join the game</p>
      </div>
      {gameId && <PlayerList gameId={gameId} />}
    </>
  );
};