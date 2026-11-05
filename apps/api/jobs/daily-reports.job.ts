import { logger } from "../config/logger";
import type { JobDefinition } from "./types";

export const dailyReportsJob: JobDefinition = {
  name: "daily-reports",
  description: "Generates daily operational summaries for hotel management.",
  schedule: "0 23 * * *",
  enabled: false,
  async run(): Promise<void> {
    logger.warn({ job: "daily-reports" }, "Daily reports are awaiting the reports module");
  },
};
