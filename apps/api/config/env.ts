import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGIN: z.string().min(1).default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  DATABASE_URL: z.url().optional(),
  REDIS_URL: z.url().optional(),
  REDIS_KEY_PREFIX: z.string().min(1).default("htms:"),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
