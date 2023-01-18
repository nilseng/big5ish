import { DomainId } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";

export const guessDomainScores = ({
  input,
  gameGateway,
}: {
  input: {
    gameId: string;
    guesses: { guessedBy: string; playerId: string; scores: { [domainId in DomainId]: number } }[];
  };
  gameGateway: GameGateway;
}) => {
  return gameGateway.guessDomainScores(input);
};
