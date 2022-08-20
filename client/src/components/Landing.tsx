import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { paths } from "../config";
import { NeuButton } from "./NeuButton";

export const roomIDLength = 6;

export const Landing = () => {
  const navigate = useNavigate();

  const initiateRoom = () => {
    navigate(`${paths.waitingRoom}/${nanoid(roomIDLength)}`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-1/2 md:w-1/2 md:h-1/2 bg-light rounded-3xl m-4 pb-4">
      <NeuButton
        type="light"
        textClassName="text-gray-700 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-500"
        text="START"
        style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
        action={initiateRoom}
      />
    </div>
  );
};
