import { RedisClientType, RedisModules, RedisScripts } from "@node-redis/client";

export class CacheGateway {
  constructor(private cache: RedisClientType<RedisModules, RedisScripts>) {
    this.cache = cache;
  }

  async set(key: string, field: string, value: unknown) {
    this.cache.HSET(key, field, JSON.stringify(value));
  }
}
