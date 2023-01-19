import { GameGateway } from "../gateways/game.gateway";
import { scheduleNextStep } from "../utils/stepScheduler";

export const startGame = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw Error("Game not found - could not be started.");
  scheduleNextStep(game, gameGateway);
  return gameGateway.startGame(gameId);
};
