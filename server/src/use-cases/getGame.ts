import { GameGateway } from "../gateways/game.gateway";

export const getGame = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) => {
  return gameGateway.getGame(gameId);
};
