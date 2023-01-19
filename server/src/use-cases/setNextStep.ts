import { Game } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";
import { scheduleNextStep } from "../utils/stepScheduler";

export const setNextStep = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }): Game => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw Error("Game not found - could not set next step.");
  if (game.currentStep >= game.steps.length - 1) return game;
  const updatedGame = gameGateway.setStep(gameId, game.currentStep + 1);
  scheduleNextStep(updatedGame, gameGateway, updatedGame.currentStep);
  return updatedGame;
};
