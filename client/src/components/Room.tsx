import { useParams } from "react-router-dom";
import { paths } from "../App";

export const Room = () => {
  const params = useParams();

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-200">game id</p>
      <h1 className="text-3xl text-gray-50">
        <code>{params.roomId}</code>
      </h1>
      <div className="flex flex-col items-center mt-20">
        <p className="text-gray-200 self-start">Go to</p>
        <p className="text-gray-50">
          <code className="text-xl">big5ish.herokuapp.com{paths.play}</code>
        </p>
        <p className="text-gray-200 self-end">to join the game</p>
      </div>
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-gray-50 text-xl">Players</h2>
        <p className="text-gray-200">No one has joined yet...</p>
      </div>
    </div>
  );
};
