import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { paths } from "./config";
import { GameIdPage } from "./pages/GameIdPage";
import { GamePage } from "./pages/GamePage";
import { Landing } from "./pages/Landing";
import { NicknamePage } from "./pages/NicknamePage";
import { PlayerPage } from "./pages/PlayerPage";
import { WaitingRoomPage } from "./pages/WaitingRoomPage";

interface IAppContext {
  isMuted?: boolean;
  setIsMuted?: Dispatch<SetStateAction<boolean>>;
  audio?: React.MutableRefObject<HTMLAudioElement>;
}

export const AppContext = createContext<IAppContext>({});

const App = () => {
  const audio = useRef(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"));
  const [isMuted, setIsMuted] = useState(true);

  return (
    <AppContext.Provider value={{ isMuted, setIsMuted, audio }}>
      <div className="h-full w-screen">
        <Navbar />
        <div className="h-full w-screen flex flex-col content-center justify-center items-center text-white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path={`${paths.waitingRoom}/:gameId`} element={<WaitingRoomPage />} />
            <Route path={`${paths.gameIdForm}`} element={<GameIdPage />} />
            <Route path={`${paths.nicknameForm}/:gameId`} element={<NicknamePage />} />
            <Route path={`${paths.playerPage}/:gameId`} element={<PlayerPage />} />
            <Route path={`${paths.gamePage}/:gameId`} element={<GamePage />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
