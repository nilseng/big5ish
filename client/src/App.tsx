import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { paths } from "./config";
import { GameIdPage } from "./pages/GameIdPage";
import { GamePage } from "./pages/GamePage";
import { LandingPage } from "./pages/LandingPage";
import { NicknamePage } from "./pages/NicknamePage";
import { PlayerPage } from "./pages/PlayerPage";
import { WaitingRoomPage } from "./pages/WaitingRoomPage";

const defaultLocale = "no";

export const LocaleContext = createContext<{ locale: string; setLocale: Dispatch<SetStateAction<string>> }>({
  locale: defaultLocale,
  setLocale: () => {},
});

const App = () => {
  const [locale, setLocale] = useState(defaultLocale);
  const [localeContext] = useState({ locale, setLocale });

  return (
    <LocaleContext.Provider value={localeContext}>
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
    </LocaleContext.Provider>
  );
};

export default App;
