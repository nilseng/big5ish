import { CacheGateway } from "../gateways/cache-gateway";

export class GameController {
  #cache: CacheGateway;

  constructor() {
    this.#cache = new CacheGateway();
  }

  async createGame(id: string) {
    await this.#cache.set("games", { id });
  }

  async getGames() {
    const res = await this.#cache.getAll();
    return res;
  }
}
