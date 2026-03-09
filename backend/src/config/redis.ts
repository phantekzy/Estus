import { Redis, type RedisOptions } from "ioredis";

const redisOption: RedisOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
};

export const connection = new Redis(redisOption);
