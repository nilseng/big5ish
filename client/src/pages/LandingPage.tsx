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

export const LandingPage = () => {
  const [gameId] = useState<string>(nanoid(roomIDLength));
  const navigate = useNavigate();

  const [createRoom, { error }] = useMutation(createRoomMutation);

  const initiateRoom = async () => {
    await createRoom({ variables: { id: gameId } });
  };

  if (error) return <p className="text-xl font-bold text-gray-50">Oh, no! Something went wrong! 😭</p>;

  return (
    <div className="h-full w-full flex justify-center items-center p-4">
      <div className="h-96 w-96 flex justify-center items-center bg-light rounded-3xl">
        <NeuButton
          type="light"
          textClassName="text-gray-700 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-500"
          text="START"
          style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
          asyncAction={initiateRoom}
          action={() => navigate(`${paths.waitingRoom}/${gameId}`)}
        />
      </div>
    </div>
  );
};
