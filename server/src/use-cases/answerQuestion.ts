import { DomainId } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";

export const answerQuestion = ({
  gameId,
  playerId,
  questionId,
  domainId,
  facet,
  score,
  gameGateway,
}: {
  gameId: string;
  playerId: string;
  questionId: string;
  domainId: DomainId;
  facet: number;
  score: number;
  gameGateway: GameGateway;
}) => {
  return gameGateway.answerQuestion({ gameId, playerId, questionId, domainId, facet, score });
};
