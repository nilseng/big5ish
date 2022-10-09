import { GameGateway } from "../gateways/game.gateway";

export const getGames = (gameGateway: GameGateway) => {
  return gameGateway.getGames();
};
