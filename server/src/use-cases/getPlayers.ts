import { GameGateway } from "../gateways/game.gateway";

export const getPlayers = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) => {
  const game = gameGateway.getGame(gameId);
  if (!game) throw Error("Game not found - could not fetch players.");
  return gameGateway.getPlayers(gameId);
};
