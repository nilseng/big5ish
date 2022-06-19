import { Cache } from "../cache/cache";

export class CacheGateway {
  #cache: Cache;

  constructor() {
    this.#cache = Cache.instance;
  }

  async set(key: string, field: string, value: unknown) {
    const res = await this.#cache.client.set(key, JSON.stringify(value));
    console.log(res);
  }

  async getAll() {
    const res = await this.#cache.client.get("games");
    console.log(res);
  }
}
