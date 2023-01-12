import { gql, useQuery } from "@apollo/client";
import { Player } from "@big5ish/types";

const playersQuery = gql`
  query players($gameId: ID!) {
    players(gameId: $gameId) {
      id
      nickname
    }
  }
`;

export const PlayerList = ({ gameId }: { gameId: string }) => {
  const { data } = useQuery<{ players: Player[] }, { gameId: string }>(playersQuery, {
    variables: { gameId },
    pollInterval: 500,
  });

  return (
    <div className="flex flex-col items-center w-full max-w-xs pt-10 pb-4">
      <h2 className="text-gray-50 text-xl pb-4">Players</h2>
      <div className="flex flex-col items-center w-full h-60 max-h-60 overflow-scroll bg-gray-50 bg-opacity-10 rounded-xl p-4">
        {(!data?.players || data?.players.length === 0) && <p className="text-gray-200">No one has joined yet...</p>}
        {data?.players?.map((player) => (
          <div key={player.id} className="text-gray-50 text-sm font-bold py-2">
            {player.nickname}
          </div>
        ))}
      </div>
    </div>
  );
};
