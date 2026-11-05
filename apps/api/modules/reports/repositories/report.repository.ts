import type { ReportId, ReportSummary } from "../types/report.types";

export interface ReportRepository {
  findAll(): Promise<ReportSummary[]>;
  findById(id: ReportId): Promise<ReportSummary | undefined>;
}
