import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { paths } from "./config";
import { GameIdPage } from "./pages/GameIdPage";
import { GamePage } from "./pages/GamePage";
import { LandingPage } from "./pages/LandingPage";
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
      <div className="h-full max-h-full w-screen overflow-hidden">
        <Navbar />
        <div className="h-[calc(100%-6rem)] w-full flex flex-col items-center overflow-auto text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
