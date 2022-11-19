import { GameGateway } from "../gateways/game.gateway";

export const createGame = ({ id, gameGateway }: { id: string; gameGateway: GameGateway }) => {
  return gameGateway.createGame(id);
};
