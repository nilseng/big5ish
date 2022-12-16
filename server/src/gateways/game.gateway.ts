import { Player } from "@big5ish/types";
import { cache } from "../cache/cache";

export class GameGateway {
  #cache;

  constructor() {
    this.#cache = cache;
  }

  addPlayer(gameId: string, nickname: string): Player {
    return this.#cache.addPlayer(gameId, nickname);
  }

  createGame(id: string) {
    this.#cache.createGame(id);
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
