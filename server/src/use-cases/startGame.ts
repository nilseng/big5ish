import { Game } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";

export const startGame = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw Error("Game not found - could not be started.");
  if (shouldScheduleNextStep(game)) scheduleNextStep(game, gameGateway);
  return gameGateway.startGame(gameId);
};

const shouldScheduleNextStep = (game: Game, currentStep = 0): boolean => {
  return !!game.steps[currentStep].duration && game.currentStep < game.steps.length - 1;
};

const scheduleNextStep = (game: Game, gameGateway: GameGateway, currentStep = 0) => {
  setTimeout(() => {
    gameGateway.setStep(game.id, currentStep + 1);
    if (shouldScheduleNextStep(game, currentStep + 1)) scheduleNextStep(game, gameGateway, currentStep + 1);
  }, game.steps[currentStep].duration);
};
