import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NeuButton } from "./NeuButton";

export const NicknameForm = () => {
  const params = useParams();

  const [nickname, setNickname] = useState("");

  const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-gray-200">game id</p>
      <h1 className="text-3xl text-gray-50 mb-8">
        <code>{params.roomId}</code>
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
      />
    </div>
  );
};
