import { env } from "./env";

export interface RedisConfig {
  url?: string;
  keyPrefix: string;
  enabled: boolean;
}

export const redisConfig: RedisConfig = {
  url: env.REDIS_URL,
  keyPrefix: env.REDIS_KEY_PREFIX,
  enabled: Boolean(env.REDIS_URL),
};
