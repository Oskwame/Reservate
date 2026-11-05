import { logger } from "../config/logger";
import type { JobDefinition } from "./types";

export const paymentReconciliationJob: JobDefinition = {
  name: "payment-reconciliation",
  description: "Compares internal payment records with payment-provider records.",
  schedule: "0 2 * * *",
  enabled: false,
  async run(): Promise<void> {
    logger.warn(
      { job: "payment-reconciliation" },
      "Payment reconciliation is awaiting payment records and provider integration",
    );
  },
};
