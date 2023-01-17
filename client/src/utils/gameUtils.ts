import { DomainId, Game } from "@big5ish/types";

export const getCurrentPlayerId = () => {
  const playerId = localStorage.getItem("playerId");
  if (!playerId) throw Error("Player id not found.");
  return playerId;
};

/** Assumes that if the current player has guessed the score of one other player, he has also guessed
 * the scores of the other players.
 */
export const hasPlayerGuessedDomainScores = ({ game, domainId }: { game: Game; domainId: DomainId }) => {
  const domainGuesses = game.domainScoreGuesses?.[domainId];
  if (!domainGuesses) return false;
  const playerId = getCurrentPlayerId();
  const firstPlayerGuesses = Object.values(domainGuesses)[0][playerId];
  return !!firstPlayerGuesses;
};
