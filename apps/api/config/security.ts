import type { HelmetOptions } from "helmet";
import { env } from "./env";

const helmetOptions: HelmetOptions = {
  crossOriginResourcePolicy: {
    policy: "cross-origin",
  },
};

export const securityConfig = {
  trustProxy: env.NODE_ENV === "production" ? 1 : false,
  helmetOptions,
  jsonBodyLimit: "1mb",
  rateLimit: {
    windowMs: 60_000,
    max: 300,
  },
} as const;
