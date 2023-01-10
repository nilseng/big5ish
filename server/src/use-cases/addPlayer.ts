import { Player } from "@big5ish/types";
import { nanoid } from "nanoid";
import { GameGateway } from "../gateways/game.gateway";

export const addPlayer = ({
  gameId,
  nickname,
  gameGateway,
}: {
  gameId: string;
  nickname: string;
  gameGateway: GameGateway;
}): Player => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw new Error(`Game w id=${gameId} not found.`);
  const player = { id: nanoid(), nickname };
  return gameGateway.addPlayer(game, player);
};
