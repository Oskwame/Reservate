import type { InventoryId, InventorySummary } from "../types/inventory.types";

export interface InventoryRepository {
  findAll(): Promise<InventorySummary[]>;
  findById(id: InventoryId): Promise<InventorySummary | undefined>;
}
