import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../config";
import { NeuButton } from "./NeuButton";

const addPlayerMutation = gql`
  mutation addPlayer($gameId: ID!, $nickname: String!) {
    addPlayer(gameId: $gameId, nickname: $nickname)
  }
`;

export const NicknameForm = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [addPlayer, { error }] = useMutation(addPlayerMutation);

  const [nickname, setNickname] = useState("");

  const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const joinGame = async () => {
    await addPlayer({ variables: { gameId, nickname } });
  };

  if (error) return <p>Hell! Something got messed up...</p>;

  return (
    <div className="flex flex-col justify-center items-center">
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
        style={{}}
        text="Join game"
        asyncAction={joinGame}
        action={() => navigate(`${paths.playerPage}/${gameId}`)}
      />
    </div>
  );
};
