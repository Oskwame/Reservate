import type { Prisma } from "./generated/prisma/client";
import { getPrismaClient } from "./client";

export type TransactionClient = Prisma.TransactionClient;

export interface TransactionOptions {
  maxWait?: number;
  timeout?: number;
  isolationLevel?: Prisma.TransactionIsolationLevel;
}

export function withTransaction<T>(
  handler: (tx: TransactionClient) => Promise<T>,
  options?: TransactionOptions,
): Promise<T> {
  return getPrismaClient().$transaction(handler, options);
}
