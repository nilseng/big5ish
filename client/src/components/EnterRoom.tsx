import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomIDLength } from "../App";
import { NeuButton } from "./NeuButton";

export const EnterRoom = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="rounded-full p-4"
        type="text"
        placeholder="Room ID..."
        onChange={(e) => setRoomID(e.target.value)}
        value={roomID}
      />
      {roomID?.length === roomIDLength && (
        <NeuButton
          className="text-light h-20 w-20 p-4 mt-4"
          textClassName="font-bold"
          action={() => navigate(`/player/${roomID}`)}
          type="colored"
          style={{}}
          text="Enter"
        />
      )}
    </div>
  );
};
