import { Game } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";
import { isTimeBoundStep } from "../utils/typeGuards";

export const startGame = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw Error("Game not found - could not be started.");
  scheduleNextStep(game, gameGateway);
  return gameGateway.startGame(gameId);
};

const shouldScheduleNextStep = (game: Game, currentStep = 0): boolean => {
  return isTimeBoundStep(game.steps[currentStep]) && game.currentStep < game.steps.length - 1;
};

const scheduleNextStep = (game: Game, gameGateway: GameGateway, currentStepIndex = 0) => {
  const currentStep = game.steps[currentStepIndex];
  if (!isTimeBoundStep(currentStep)) return;
  setTimeout(() => {
    gameGateway.setStep(game.id, currentStepIndex + 1);
    if (shouldScheduleNextStep(game, currentStepIndex + 1)) scheduleNextStep(game, gameGateway, currentStepIndex + 1);
  }, currentStep.duration);
};
