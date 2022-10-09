import { cache } from "../cache/cache";

export class GameGateway {
  #cache;

  constructor() {
    this.#cache = cache;
  }

  createGame(id: string) {
    this.#cache.createGame(id);
  }

  addPlayer(gameId: string, nickname: string) {
    this.#cache.addPlayer(gameId, nickname);
  }

  getGames() {
    return this.#cache.getGames();
  }
}
