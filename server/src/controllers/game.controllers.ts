import { CacheGateway } from "../gateways/cache-gateway";

export class GameController {
  #cache: CacheGateway;

  constructor() {
    this.#cache = new CacheGateway();
  }

  async createGame(id: string) {
    await this.#cache.set("games", id, { status: "created" });
  }

  async getGames() {
    await this.#cache.getAll();
  }
}
