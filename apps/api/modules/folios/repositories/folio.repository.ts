import type { FolioId, FolioSummary } from "../types/folio.types";

export interface FolioRepository {
  findAll(): Promise<FolioSummary[]>;
  findById(id: FolioId): Promise<FolioSummary | undefined>;
}
