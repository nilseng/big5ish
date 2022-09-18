import { Cache } from "../cache/cache";

export class CacheGateway {
  #cache: Cache;

  constructor() {
    this.#cache = Cache.instance;
  }

  async set(key: string, field: string, value: unknown) {
    const res = await this.#cache.client.hSet(key, field, JSON.stringify(value));
    return res;
  }

  async getAll() {
    const res = await this.#cache.client.hGetAll("rooms");
    return res;
  }

  async get(key: string, field: string) {
    const res = await this.#cache.client.hGet(key, field);
    return res;
  }
}
