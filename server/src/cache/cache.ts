import { Answer, DomainId, Game, GameStatus, Player, Step } from "@big5ish/types";

class Cache {
  #games: Game[] = [];

  addPlayer(game: Game, player: Player) {
    game.players.unshift(player);
    return player;
  }

  createGame({
    id,
    steps,
    status,
    currentStep,
    answers,
  }: {
    id: string;
    steps: Step[];
    status: GameStatus;
    currentStep: number;
    answers: Answer[];
  }) {
    const game = { id, status, players: [], steps, currentStep, answers };
    this.#games.push(game);
    return game;
  }

  getGame(id: string) {
    return this.#games.find((g) => g.id === id);
  }

  getGames() {
    return this.#games;
  }

  getPlayers(gameId: string) {
    return this.getGame(gameId)?.players;
  }

  startGame(gameId: string) {
    const game = this.getGame(gameId);
    if (!game) throw Error("Game not found - could not start game.");
    game.status = GameStatus.Started;
    return game;
  }

  setStep(gameId: string, step: number): Game {
    const game = this.getGame(gameId);
    if (!game) throw Error("Game not found - could not set step.");
    game.currentStep = step;
    return game;
  }

  guessDomainScores(input: {
    gameId: string;
    guesses: { guessedBy: string; playerId: string; scores: { [domainId in DomainId]: number } }[];
  }) {
    const game = this.getGame(input.gameId);
    if (!game) throw Error("Game not found - could not set domain score guesses.");
    if (!game.domainScoreGuesses) game.domainScoreGuesses = [];
    for (const guess of input.guesses) {
      const existingGuess = game.domainScoreGuesses?.find(
        ({ guessedBy, playerId }) => guessedBy === guess.guessedBy && playerId === guess.playerId
      );
      if (existingGuess) existingGuess.scores = { ...existingGuess.scores, ...guess.scores };
      else game.domainScoreGuesses.push({ playerId: guess.playerId, guessedBy: guess.guessedBy, scores: guess.scores });
    }
  }

  answerQuestion({
    gameId,
    playerId,
    questionId,
    domainId,
    facet,
    score,
  }: {
    gameId: string;
    playerId: string;
    questionId: string;
    domainId: DomainId;
    facet: number;
    score: number;
  }) {
    const game = this.getGame(gameId);
    if (!game) throw Error("Game not found - could not answer question.");
    game.answers.push({ playerId, questionId, domainId, facet, score });
    return game;
  }
}

export const cache = new Cache();
