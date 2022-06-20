import { Cache } from "../cache/cache";

export class CacheGateway {
  #cache: Cache;

  constructor() {
    this.#cache = Cache.instance;
  }

  async set(key: string, value: unknown) {
    const res = await this.#cache.client.set(key, JSON.stringify(value));
    return res;
  }

  async getAll() {
    const res = await this.#cache.client.get("games");
    return res ? JSON.parse(res) : null;
  }
}
