import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("database", "prisma", "schema.prisma"),
  migrations: {
    path: path.join("database", "prisma", "migrations"),
    seed: "tsx database/prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
