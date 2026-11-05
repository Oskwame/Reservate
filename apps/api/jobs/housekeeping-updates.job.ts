import { logger } from "../config/logger";
import type { JobDefinition } from "./types";

export const housekeepingUpdatesJob: JobDefinition = {
  name: "housekeeping-updates",
  description: "Processes scheduled housekeeping tasks and room-status transitions.",
  schedule: "*/15 * * * *",
  enabled: false,
  async run(): Promise<void> {
    logger.warn(
      { job: "housekeeping-updates" },
      "Housekeeping updates are awaiting the housekeeping module",
    );
  },
};
