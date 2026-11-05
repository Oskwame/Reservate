import { env } from "./env";

export interface DatabaseConfig {
  driver: "memory";
  url?: string;
  pool: {
    min: number;
    max: number;
  };
}

export const databaseConfig: DatabaseConfig = {
  driver: "memory",
  url: env.DATABASE_URL,
  pool: {
    min: 0,
    max: 10,
  },
};
