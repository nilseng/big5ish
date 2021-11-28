import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";
import { Landing } from "./components/Landing/Landing";
import { Navbar } from "./components/Navbar";

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
      <div className="h-screen w-screen">
        <Navbar />
        <div className="h-screen w-screen flex content-center justify-center items-center">
          <Landing />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
