import { Game, Player } from "@big5ish/types";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";

export const useOtherPLayers = (game?: Game) => {
  const [otherPlayers, setOtherPlayers] = useState<Player[]>();

  useEffect(() => {
    const playerId = getCookie("playerId");
    if (game?.players) setOtherPlayers(game.players.filter((player) => player.id !== playerId));
  }, [game]);

  return otherPlayers;
};
