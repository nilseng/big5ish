import { useParams } from "react-router-dom";
import { NeuButton } from "./NeuButton";

export const RegisterPlayer = () => {
  const params = useParams();

  return (
    <div className="flex flex-col justify-center items-center">
      <input className="rounded-full p-4" type="text" placeholder="Your name..." />
      <NeuButton
        className="text-light h-20 w-20 p-4 mt-8"
        textClassName="font-bold"
        type="colored"
        style={{}}
        text="Join game"
      />
      <p className="text-gray-200 mt-8">game id</p>
      <h1 className="text-3xl text-gray-50">
        <code>{params.roomId}</code>
      </h1>
    </div>
  );
};
