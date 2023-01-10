import { Game, GameStatus, Player, Step } from "@big5ish/types";
import { cache } from "../cache/cache";

export class GameGateway {
  #cache;

  constructor() {
    this.#cache = cache;
  }

  addPlayer(game: Game, player: Player): Player {
    return this.#cache.addPlayer(game, player);
  }

  createGame({ id, steps }: { id: string; steps: Step[] }) {
    this.#cache.createGame({ id, steps, status: GameStatus.Created });
  }

  getGame(gameId: string) {
    return this.#cache.getGame(gameId);
  }

  getGames() {
    return this.#cache.getGames();
  }

  getPlayers(gameId: string) {
    return this.#cache.getPlayers(gameId);
  }

  startGame(gameId: string) {
    return this.#cache.startGame(gameId);
  }
}
