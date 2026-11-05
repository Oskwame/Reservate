import type { ProcurementId, ProcurementSummary } from "../types/procurement.types";

export interface ProcurementRepository {
  findAll(): Promise<ProcurementSummary[]>;
  findById(id: ProcurementId): Promise<ProcurementSummary | undefined>;
}
