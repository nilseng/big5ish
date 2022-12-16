import { Player } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";
import { addPlayer } from "../use-cases/addPlayer";
import { createGame } from "../use-cases/createGame";
import { getGame } from "../use-cases/getGame";
import { getGames } from "../use-cases/getGames";
import { getPlayers } from "../use-cases/getPlayers";
import { startGame } from "../use-cases/startGame";

export class GameController {
  #gameGateway: GameGateway;

  constructor() {
    this.#gameGateway = new GameGateway();
  }

  addPlayer({ gameId, nickname }: { gameId: string; nickname: string }): Player {
    return addPlayer({ gameId, nickname, gameGateway: this.#gameGateway });
  }

  createGame(id: string) {
    createGame({ id, gameGateway: this.#gameGateway });
    return `Game with id=${id} created`;
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
}
