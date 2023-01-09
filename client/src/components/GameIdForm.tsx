import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths, roomIDLength } from "../config";
import { NeuButton } from "./NeuButton";

export const GameIdForm = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  return (
    <div className="flex flex-col justify-center items-center text-black">
      <input
        className="rounded-full p-4"
        type="text"
        placeholder="Game ID..."
        onChange={(e) => setRoomID(e.target.value)}
        value={roomID}
      />
      <NeuButton
        className="h-20 w-20 p-4 mt-4"
        textClassName={`${roomID?.length === roomIDLength ? "text-light" : ""} font-bold`}
        disabled={roomID?.length !== roomIDLength}
        action={() => navigate(`${paths.nicknameForm}/${roomID}`)}
        type="colored"
        text="Enter"
      />
    </div>
  );
};
