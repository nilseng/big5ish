import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import { Navbar } from "./components/Navbar";

interface IAppContext {
  isMuted?: boolean;
  setIsMuted?: Dispatch<SetStateAction<boolean>>;
  audio?: React.MutableRefObject<HTMLAudioElement>;
}

export const AppContext = createContext<IAppContext>({});

const App = () => {
  const navigate = useNavigate();

  const audio = useRef(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"));
  const [isMuted, setIsMuted] = useState(true);
  const [roomPath] = useState<string>("test-room");

  const initiateRoom = () => {
    navigate(roomPath);
  };

  return (
    <AppContext.Provider value={{ isMuted, setIsMuted, audio }}>
      <div className="h-screen w-screen">
        <Navbar />
        <div className="h-screen w-screen flex content-center justify-center items-center">
          <Routes>
            <Route path="/" element={<Landing createRoom={initiateRoom} />} />
            {roomPath && <Route path={roomPath} element={<p>test</p>} />}
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
