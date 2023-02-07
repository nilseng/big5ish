import { gql, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocaleContext } from "../App";
import { NeuButton } from "../components/NeuButton";
import { paths } from "../config";
import translations from "./LandingPage.translations.json";

export const roomIDLength = 6;
const boldGradientTextClass = "font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-500";

const createRoomMutation = gql`
  mutation createGame($id: ID!) {
    createGame(id: $id)
  }
`;

export const LandingPage = () => {
  const [gameId] = useState<string>(nanoid(roomIDLength));
  const navigate = useNavigate();

  const { locale, setLocale } = useContext(LocaleContext);

  const [createRoom, { error }] = useMutation(createRoomMutation);

  const initiateRoom = async () => {
    await createRoom({ variables: { id: gameId } });
  };

  if (error) return <p className="text-xl font-bold text-gray-50">{translations[locale].errorMsg}</p>;

  return (
    <div className="h-full w-full flex justify-center items-center p-4">
      <div className="h-96 w-96 flex flex-col justify-center items-center bg-light rounded-3xl">
        <NeuButton
          type="light"
          textClassName={`text-gray-700 text-xl ${boldGradientTextClass}`}
          text={translations[locale].start}
          style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
          asyncAction={initiateRoom}
          action={() => navigate(`${paths.waitingRoom}/${gameId}`)}
        />
        <div className="grid grid-cols-2 gap-4 place-items-center pt-4">
          {locale === "no" ? (
            <p className={`${boldGradientTextClass}`}>Nor</p>
          ) : (
            <NeuButton type="light" text="Nor" className="h-16 w-16" action={() => setLocale("no")} />
          )}
          {locale === "en" ? (
            <p className={`${boldGradientTextClass}`}>Eng</p>
          ) : (
            <NeuButton type="light" text="Eng" className="h-16 w-16" action={() => setLocale("en")} />
          )}
        </div>
      </div>
    </div>
  );
};
