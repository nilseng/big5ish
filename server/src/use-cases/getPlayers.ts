import { GameGateway } from "../gateways/game.gateway";

export const getPlayers = ({ gameId, gameGateway }: { gameId: string; gameGateway: GameGateway }) =>
  gameGateway.getPlayers(gameId);
