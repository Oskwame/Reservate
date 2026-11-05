import { logger } from "../config/logger";
import type { JobDefinition } from "./types";

export const expiredReservationsJob: JobDefinition = {
  name: "expired-reservations",
  description: "Releases reservations that have passed their expiry conditions.",
  schedule: "*/30 * * * *",
  enabled: false,
  async run(): Promise<void> {
    logger.warn(
      { job: "expired-reservations" },
      "Expired reservation handling is awaiting an expiry policy",
    );
  },
};
