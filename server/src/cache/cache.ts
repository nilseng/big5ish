import { RedisClientType, RedisModules, RedisScripts } from "@node-redis/client";
import { createClient } from "redis";

export const initializeCache = async (): Promise<RedisClientType<RedisModules, RedisScripts>> => {
  const cache = createClient({ url: process.env.REDIS_URL });

  await cache
    .connect()
    .then(() => console.log("Server is connected to Redis cache."))
    .catch(() => console.error("Could not connect to cache"));

  cache.on("error", (e) => console.error("REDIS:", e));

  return cache;
};
