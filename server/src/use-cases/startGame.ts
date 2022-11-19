import { GameGateway } from "../gateways/game.gateway";

export const startGame = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) => {
  return gameGateway.startGame(gameId);
};
