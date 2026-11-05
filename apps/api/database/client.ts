import { PrismaPg } from "@prisma/adapter-pg";
import { databaseConfig } from "../config/database";
import { PrismaClient } from "./generated/prisma/client";

type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClient;
};

const prismaGlobal = globalThis as PrismaGlobal;

export function isDatabaseConfigured(): boolean {
  return Boolean(databaseConfig.url);
}

export function getPrismaClient(): PrismaClient {
  if (!databaseConfig.url) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!prismaGlobal.prisma) {
    const adapter = new PrismaPg({ connectionString: databaseConfig.url });
    prismaGlobal.prisma = new PrismaClient({ adapter });
  }

  return prismaGlobal.prisma;
}

export async function disconnectPrisma(): Promise<void> {
  if (!prismaGlobal.prisma) {
    return;
  }

  await prismaGlobal.prisma.$disconnect();
  prismaGlobal.prisma = undefined;
}
