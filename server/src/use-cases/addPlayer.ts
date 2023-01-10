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
}) => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw new Error(`Game w id=${gameId} not found.`);
  const player = { id: nanoid(), nickname };
  gameGateway.addPlayer(game, player);
};
