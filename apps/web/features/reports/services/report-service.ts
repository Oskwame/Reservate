import type { ReportSummary } from "../types/report";
import { sampleReports } from "./sample-reports";

export function listReports(): ReportSummary[] {
  return sampleReports;
}
