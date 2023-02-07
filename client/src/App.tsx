import { LocaleId } from "@big5ish/types";
import { createContext, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { paths } from "./config";
import { GameIdPage } from "./pages/GameIdPage";
import { GamePage } from "./pages/GamePage";
import { LandingPage } from "./pages/LandingPage";
import { NicknamePage } from "./pages/NicknamePage";
import { PlayerPage } from "./pages/PlayerPage";
import { WaitingRoomPage } from "./pages/WaitingRoomPage";

const defaultLocale: LocaleId = "no";

export const LocaleContext = createContext<{ locale: LocaleId; selectLocale: (localeId: LocaleId) => void }>({
  locale: defaultLocale,
  selectLocale: () => {},
});

const App = () => {
  const [locale, setLocale] = useState<LocaleId>((localStorage.getItem("localeId") as LocaleId) ?? defaultLocale);
  const selectLocale = useCallback((locale: LocaleId) => {
    setLocale(locale);
    localStorage.setItem("localeId", locale);
  }, []);
  const [localeContext, setLocaleContext] = useState({ locale, selectLocale });
  useEffect(() => setLocaleContext({ locale, selectLocale }), [locale, selectLocale]);

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
