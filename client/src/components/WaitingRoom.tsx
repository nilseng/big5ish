import { gql, useQuery } from "@apollo/client";
import { Player } from "@big5ish/types";
import { useParams } from "react-router-dom";
import { paths } from "../config";

const playersQuery = gql`
  query players($gameId: ID!) {
    players(gameId: $gameId) {
      id
      nickname
    }
  }
`;

export const WaitingRoom = () => {
  const { roomId } = useParams();

  const { data } = useQuery<{ players: Player[] }, { gameId: string }>(playersQuery, {
    variables: { gameId: roomId ?? "" },
    pollInterval: 500,
  });

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-200">game id</p>
      <h1 className="text-3xl text-gray-50">
        <code>{roomId}</code>
      </h1>
      <div className="flex flex-col items-center mt-20">
        <p className="text-gray-200 self-start">Go to</p>
        <p className="text-gray-50 my-4">
          <code className="text-xl">big5ish.herokuapp.com{paths.gameIdForm}</code>
        </p>
        <p className="text-gray-200 self-end">to join the game</p>
      </div>
      <div className="flex flex-col items-center w-full max-w-screen-sm mt-20">
        <h2 className="text-gray-50 text-xl mb-4">Players</h2>
        <div className="flex flex-col items-center w-full h-60 max-h-60 overflow-scroll bg-gray-50 bg-opacity-10 rounded-xl p-4">
          {(!data?.players || data?.players.length === 0) && <p className="text-gray-200">No one has joined yet...</p>}
          {data?.players?.map((player) => (
            <div key={player.id} className="text-gray-50 text-sm font-bold my-2">
              {player.nickname}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
