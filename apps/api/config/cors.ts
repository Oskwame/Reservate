import type { CorsOptions } from "cors";
import { env } from "./env";

export function resolveCorsOrigin(): true | string[] {
  if (env.CORS_ORIGIN === "*") {
    return true;
  }

  return env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
}

export const corsOptions: CorsOptions = {
  origin: resolveCorsOrigin(),
  credentials: true,
};
