import { gql, useMutation } from "@apollo/client";
import { Player } from "@big5ish/types";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMsg } from "../components/ErrorMsg";
import { NeuButton } from "../components/NeuButton";
import { paths } from "../config";

const addPlayerMutation = gql`
  mutation addPlayer($gameId: ID!, $nickname: String!) {
    player: addPlayer(gameId: $gameId, nickname: $nickname) {
      id
    }
  }
`;

export const NicknamePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [addPlayer, { error }] = useMutation<{ player: Player }>(addPlayerMutation);

  const [nickname, setNickname] = useState("");

  const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const joinGame = async () => {
    const { data } = await addPlayer({ variables: { gameId, nickname } });
    if (data?.player?.id) localStorage.setItem("playerId", data.player.id);
  };

  if (error) return <ErrorMsg msg={"Oh, no, something went wrong🤖⚙️"} />;

  return (
    <div className="h-full flex flex-col justify-center items-center text-black">
      <p className="text-gray-200">game id</p>
      <h1 className="text-3xl text-gray-50 mb-8">
        <code>{gameId}</code>
      </h1>
      <input
        className="rounded-full p-4"
        type="text"
        placeholder="Name..."
        value={nickname}
        onChange={handleSetNickname}
      />
      <NeuButton
        className="h-20 w-20 p-4 mt-8"
        textClassName={`${nickname ? "text-light" : ""} font-bold`}
        disabled={!nickname}
        type="colored"
        text="Join game"
        asyncAction={joinGame}
        action={() => navigate(`${paths.playerPage}/${gameId}`)}
      />
    </div>
  );
};
