import type { StayId, StaySummary } from "../types/stay.types";

export interface StayRepository {
  findAll(): Promise<StaySummary[]>;
  findById(id: StayId): Promise<StaySummary | undefined>;
}
