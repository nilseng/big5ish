import { gql, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NeuButton } from "../components/NeuButton";
import { paths } from "../config";

export const roomIDLength = 6;

const createRoomMutation = gql`
  mutation createGame($id: ID!) {
    createGame(id: $id)
  }
`;

export const Landing = () => {
  const [gameId] = useState<string>(nanoid(roomIDLength));
  const navigate = useNavigate();

  const [createRoom, { error }] = useMutation(createRoomMutation);

  const initiateRoom = async () => {
    await createRoom({ variables: { id: gameId } });
  };

  if (error) return <p className="text-xl font-bold text-gray-50">Shit! Something went wrong! :(</p>;

  return (
    <div className="flex flex-col justify-center items-center w-full h-1/2 md:w-1/2 md:h-1/2 bg-light rounded-3xl m-4 pb-4">
      <NeuButton
        type="light"
        textClassName="text-gray-700 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-500"
        text="START"
        style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
        asyncAction={initiateRoom}
        action={() => navigate(`${paths.waitingRoom}/${gameId}`)}
      />
    </div>
  );
};
