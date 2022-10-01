import { GameGateway } from "../gateways/game.gateway";

export const createGame = async ({ id, gameGateway }: { id: string; gameGateway: GameGateway }) => {
  return gameGateway.createGame(id);
};
