import type { HousekeepingId, HousekeepingSummary } from "../types/housekeeping.types";

export interface HousekeepingRepository {
  findAll(): Promise<HousekeepingSummary[]>;
  findById(id: HousekeepingId): Promise<HousekeepingSummary | undefined>;
}
