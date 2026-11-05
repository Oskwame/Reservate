import type { GuestId, GuestSummary } from "../types/guest.types";

export interface GuestRepository {
  findAll(): Promise<GuestSummary[]>;
  findById(id: GuestId): Promise<GuestSummary | undefined>;
}
