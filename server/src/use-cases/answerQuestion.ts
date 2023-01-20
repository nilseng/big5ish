import { GameGateway } from "../gateways/game.gateway";

export const answerQuestion = ({
  gameId,
  playerId,
  questionId,
  score,
  gameGateway,
}: {
  gameId: string;
  playerId: string;
  questionId: string;
  score: number;
  gameGateway: GameGateway;
}) => {
  return gameGateway.answerQuestion({ gameId, playerId, questionId, score });
};
