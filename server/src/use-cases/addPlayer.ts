import { GameGateway } from "../gateways/game.gateway";

export const addPlayer = ({
  gameId,
  nickname,
  gameGateway,
}: {
  gameId: string;
  nickname: string;
  gameGateway: GameGateway;
}) => gameGateway.addPlayer(gameId, nickname);
