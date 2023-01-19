import { Game } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";
import { isTimeBoundStep } from "./typeGuards";

const shouldScheduleNextStep = (game: Game, currentStep = 0): boolean => {
  return isTimeBoundStep(game.steps[currentStep]) && game.currentStep < game.steps.length - 1;
};

export const scheduleNextStep = (game: Game, gameGateway: GameGateway, currentStepIndex = 0) => {
  const currentStep = game.steps[currentStepIndex];
  if (!isTimeBoundStep(currentStep)) return;
  setTimeout(() => {
    gameGateway.setStep(game.id, currentStepIndex + 1);
    if (shouldScheduleNextStep(game, currentStepIndex + 1)) scheduleNextStep(game, gameGateway, currentStepIndex + 1);
  }, currentStep.duration);
};
