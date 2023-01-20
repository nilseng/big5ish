import { DomainId, Game } from "@big5ish/types";
import { isDomainPresentationStep } from "./typeGuards";

export const getCurrentPlayerId = () => {
  const playerId = localStorage.getItem("playerId");
  if (!playerId) throw Error("Player id not found.");
  return playerId;
};

/** Assumes that if the current player has guessed the score of one other player for the given domain, he has also guessed
 * the scores of the other players for the domain.
 */
export const hasPlayerGuessedDomainScores = ({
  game,
  domainId,
  playerId,
}: {
  game: Game;
  domainId: DomainId;
  playerId?: string;
}) => {
  const guessedBy = playerId ?? getCurrentPlayerId();
  const domainGuess = game.domainScoreGuesses?.find((guess) => {
    return guess.guessedBy === guessedBy && guess.scores[domainId];
  });
  return !!domainGuess;
};

export const getCurrentDomainPresentationStep = (game: Game) => {
  return (
    game.currentStep - game.steps.slice(0, game.currentStep).filter((step) => !isDomainPresentationStep(step)).length
  );
};

export const getAnswer = ({ game, playerId, questionId }: { game: Game; playerId: string; questionId: string }) => {
  return game.answers.find((a) => a.playerId === playerId && a.questionId === questionId);
};
