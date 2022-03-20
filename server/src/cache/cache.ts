import { RedisClientType, RedisModules, RedisScripts } from "@node-redis/client";
import { createClient } from "redis";

export const initializeCache = async (): Promise<RedisClientType<RedisModules, RedisScripts>> => {
  const cache = createClient({ url: process.env.REDIS_URL });

  await cache
    .connect()
    .then(() => console.log("Server is connected to Redis cache."))
    .catch((e) => console.error("Could not connect to cache", e));

  //Capture app termination/restart events
  //To be called when process is restarted or terminated
  const disconnect = async (msg: string) => {
    await cache.disconnect();
    console.log("Redis client disconnected through " + msg);
  };

  //For app termination
  process.on("SIGINT", () => {
    disconnect("app termination");
  });
  //For Heroku app termination
  process.on("SIGTERM", () => {
    disconnect("Heroku app termination");
  });

  return cache;
};
