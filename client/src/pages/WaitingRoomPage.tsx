import { gql, useMutation, useQuery } from "@apollo/client";
import { Player } from "@big5ish/types";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocaleContext } from "../App";
import { CopyButton } from "../components/CopyButton";
import { ErrorMsg } from "../components/ErrorMsg";
import { NeuButton } from "../components/NeuButton";
import { PlayerList } from "../components/PlayerList";
import { paths } from "../config";
import translations from "./WaitingRoomPage.translations.json";

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
  const [playUrl] = useState(`${window.location.host}${paths.gameIdForm}`);

  const { locale } = useContext(LocaleContext);

  const { data, error } = useQuery<{ players: Player[] }, { gameId: string | undefined }>(playersQuery, {
    variables: { gameId },
    pollInterval: 500,
  });

  const [startGame, { error: startGameError }] = useMutation(startGameMutation);

  if (error || !gameId) return <ErrorMsg msg={"Something is terribly wrong here😭 Please try again🙏"} />;

  return (
    <>
      <p className="text-gray-200">{translations[locale].gameId}</p>
      <h1 className="text-3xl text-gray-50 flex items-center">
        <code className="mr-2">{gameId}</code>
        <CopyButton text={gameId} className="text-base align-middle" />
      </h1>
      <div className="pt-10">
        <NeuButton
          type="colored"
          textClassName="font-bold text-xl text-gray-50"
          text={`${translations[locale].PLAY}`}
          style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
          disabled={!data?.players?.length || data?.players?.length < 2}
          asyncAction={() => startGame({ variables: { gameId } })}
          action={() => navigate(`/game/${gameId}`)}
        />
      </div>
      {startGameError && <p className="color-red-500">{translations[locale].startGameError}</p>}
      <div className="flex flex-col items-center pt-10">
        <p className="text-gray-200 self-start">{translations[locale].goTo}</p>
        <p className="text-gray-50 py-4">
          <code className="text-xl mr-2">{playUrl}</code>
          <CopyButton text={playUrl} />
        </p>
        <p className="text-gray-200 self-end">{translations[locale].toJoin}</p>
      </div>
      {gameId && <PlayerList gameId={gameId} />}
    </>
  );
};
