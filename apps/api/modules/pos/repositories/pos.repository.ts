import type { PosId, PosSummary } from "../types/pos.types";

export interface PosRepository {
  findAll(): Promise<PosSummary[]>;
  findById(id: PosId): Promise<PosSummary | undefined>;
}
