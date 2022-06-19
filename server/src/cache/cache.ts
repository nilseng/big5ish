import { RedisClientType, RedisModules, RedisScripts } from "@node-redis/client";
import { createClient } from "redis";

export class Cache {
  #client: RedisClientType<RedisModules, RedisScripts>;
  static instance: Cache;

  constructor() {
    this.#client = this.init();
    this.connect();
  }

  init() {
    const cache = createClient({ url: process.env.REDIS_URL });
    if (!Cache.instance) Cache.instance = this;
    return cache;
  }

  connect() {
    this.#client
      .connect()
      .then(() => console.info("Initial connection to Redis cache established."))
      .catch(() => console.error("Could not connect to cache"));

    this.#client.on("error", (e) => console.error("REDIS:", e));
  }

  async quit() {
    await this.#client.quit();
  }

  get client() {
    return this.#client;
  }
}
