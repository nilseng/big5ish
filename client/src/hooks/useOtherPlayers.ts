import { Game, Player } from "@big5ish/types";
import { useEffect, useState } from "react";

export const useOtherPLayers = (game?: Game, playerId?: string) => {
  const [otherPlayers, setOtherPlayers] = useState<Player[]>();

  useEffect(() => {
    const id = playerId ?? localStorage.getItem("playerId");
    if (game?.players) setOtherPlayers(game.players.filter((player) => player.id !== id));
  }, [game, playerId]);

  return otherPlayers;
};
