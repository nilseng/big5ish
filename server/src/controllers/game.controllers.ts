import { DomainId, LocaleId, Player } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";
import { addPlayer } from "../use-cases/addPlayer";
import { answerQuestion } from "../use-cases/answerQuestion";
import { createGame } from "../use-cases/createGame";
import { getGame } from "../use-cases/getGame";
import { getGames } from "../use-cases/getGames";
import { getPlayers } from "../use-cases/getPlayers";
import { guessDomainScores } from "../use-cases/guessDomainScores";
import { setNextStep } from "../use-cases/setNextStep";
import { startGame } from "../use-cases/startGame";

export class GameController {
  #gameGateway: GameGateway;

  constructor() {
    this.#gameGateway = new GameGateway();
  }

  addPlayer({ gameId, nickname }: { gameId: string; nickname: string }): Player {
    return addPlayer({ gameId, nickname, gameGateway: this.#gameGateway });
  }

  createGame({ gameId, localeId }: { gameId: string; localeId: LocaleId }) {
    return createGame({ id: gameId, language: localeId, gameGateway: this.#gameGateway });
  }

  getGame(gameId: string) {
    return getGame({ gameId, gameGateway: this.#gameGateway });
  }

  getGames() {
    return getGames(this.#gameGateway);
  }

  getPlayers(gameId: string) {
    return getPlayers({ gameId, gameGateway: this.#gameGateway });
  }

  startGame(gameId: string) {
    return startGame({ gameId, gameGateway: this.#gameGateway });
  }

  guessDomainScores(input: {
    gameId: string;
    guesses: { guessedBy: string; playerId: string; scores: { [domainId in DomainId]: number } }[];
  }) {
    return guessDomainScores({ input, gameGateway: this.#gameGateway });
  }

  setNextStep(gameId: string) {
    return setNextStep({ gameId, gameGateway: this.#gameGateway });
  }

  answerQuestion(input: {
    gameId: string;
    playerId: string;
    questionId: string;
    domainId: DomainId;
    facet: number;
    score: number;
  }) {
    return answerQuestion({ ...input, gameGateway: this.#gameGateway });
  }
}
