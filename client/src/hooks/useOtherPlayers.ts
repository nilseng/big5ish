import { Game, Player } from "@big5ish/types";
import { useEffect, useState } from "react";

export const useOtherPLayers = (game?: Game) => {
  const [otherPlayers, setOtherPlayers] = useState<Player[]>();

  useEffect(() => {
    const cookieName = "playerId";
    const playerIdCookie = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.indexOf(`${cookieName}=`) === 0);
    const thisPlayer = playerIdCookie?.substring(`${cookieName}=`.length, playerIdCookie.length);
    if (game?.players) setOtherPlayers(game.players.filter((player) => player.id !== thisPlayer));
  }, [game]);

  return otherPlayers;
};
