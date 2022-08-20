import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { GameIdForm } from "./components/GameIdForm";
import { Landing } from "./components/Landing";
import { Navbar } from "./components/Navbar";
import { NicknameForm } from "./components/NicknameForm";
import { WaitingRoom } from "./components/WaitingRoom";
import { paths } from "./config";

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
        <div className="h-full w-screen flex content-center justify-center items-center">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path={`${paths.waitingRoom}/:roomId`} element={<WaitingRoom />} />
            <Route path={`${paths.gameIdForm}`} element={<GameIdForm />} />
            <Route path={`${paths.nicknameForm}/:roomId`} element={<NicknameForm />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
