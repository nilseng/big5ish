import { nanoid } from "nanoid";
import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EnterRoom } from "./components/EnterRoom";
import { Landing } from "./components/Landing/Landing";
import { Navbar } from "./components/Navbar";
import { RegisterPlayer } from "./components/RegisterPlayer";
import { Room } from "./components/Room";

interface IAppContext {
  isMuted?: boolean;
  setIsMuted?: Dispatch<SetStateAction<boolean>>;
  audio?: React.MutableRefObject<HTMLAudioElement>;
}

export const AppContext = createContext<IAppContext>({});

export const paths = {
  room: "/room",
  play: "/play",
  player: "/player",
};

export const roomIDLength = 6;

const App = () => {
  const navigate = useNavigate();

  const audio = useRef(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"));
  const [isMuted, setIsMuted] = useState(true);

  const initiateRoom = () => {
    navigate(`${paths.room}/${nanoid(roomIDLength)}`);
  };

  return (
    <AppContext.Provider value={{ isMuted, setIsMuted, audio }}>
      <div className="h-full w-screen">
        <Navbar />
        <div className="h-full w-screen flex content-center justify-center items-center">
          <Routes>
            <Route path="/" element={<Landing createRoom={initiateRoom} />} />
            <Route path={`${paths.room}/:roomId`} element={<Room />} />
            <Route path={`${paths.play}`} element={<EnterRoom />} />
            <Route path={`${paths.player}/:roomId`} element={<RegisterPlayer />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
