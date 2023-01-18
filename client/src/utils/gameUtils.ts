import { DomainId, Game } from "@big5ish/types";

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
