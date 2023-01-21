import { getTemplate } from "@alheimsins/b5-result-text";
import { Answer, DomainId, Game } from "@big5ish/types";
import { isDomainPresentationStep } from "./typeGuards";

export const domains: { [domainId in DomainId]: domainId } = {
  A: "A",
  C: "C",
  E: "E",
  N: "N",
  O: "O",
};

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

interface GameResults {
  [playerId: string]: SingleResults;
}
interface SingleResults {
  [domainId: string]: { avgScore?: number; facets?: { [id: number]: number } };
}

export const calculateResults = (game: Game): GameResults => {
  const results: GameResults = {};
  results.group = calculateSingleResults({ game });
  game.players.forEach((player) => {
    results[player.id] = calculateSingleResults({ game, playerId: player.id });
  });
  return results;
};

const calculateSingleResults = ({ game, playerId }: { game: Game; playerId?: string }) => {
  const results: SingleResults = {};
  getTemplate().forEach((d) => {
    results[d.domain] = {};
    const domainAnswers = getAnswers({ game, playerId, domainId: d.domain });
    results[d.domain].avgScore = getAverageScore(domainAnswers);
    results[d.domain].facets = {};
    d.facets.forEach((f) => {
      const facetAnswers = getAnswers({ game, playerId, domainId: d.domain, facet: f.facet });
      results[d.domain]!.facets![f.facet] = getAverageScore(facetAnswers);
    });
  });
  return results;
};

const getAnswers = ({
  game,
  playerId,
  domainId,
  facet,
}: {
  game: Game;
  playerId?: string;
  domainId: DomainId;
  facet?: number;
}) => {
  return game.answers.filter(
    (a) => (!playerId || a.playerId === playerId) && a.domainId === domainId && (!facet || a.facet === facet)
  );
};

const getAverageScore = (answers: Answer[]): number => {
  return answers.map((a) => a.score).reduce((sum, curr) => sum + curr, 0) / answers.length;
};
