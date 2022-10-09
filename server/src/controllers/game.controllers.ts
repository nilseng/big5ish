import { GameGateway } from "../gateways/game.gateway";
import { addPlayer } from "../use-cases/addPlayer";
import { createGame } from "../use-cases/createGame";
import { getGames } from "../use-cases/getGames";

export class GameController {
  #gameGateway: GameGateway;

  constructor() {
    this.#gameGateway = new GameGateway();
  }

  createGame(id: string) {
    createGame({ id, gameGateway: this.#gameGateway });
    return `Game with id=${id} created`;
  }

  addPlayer({ gameId, nickname }: { gameId: string; nickname: string }) {
    addPlayer({ gameId, nickname, gameGateway: this.#gameGateway });
  }

  getGames() {
    return getGames(this.#gameGateway);
  }
}
