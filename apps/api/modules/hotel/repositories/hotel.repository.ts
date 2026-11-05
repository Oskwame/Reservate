import type { HotelId, HotelSummary } from "../types/hotel.types";

export interface HotelRepository {
  findAll(): Promise<HotelSummary[]>;
  findById(id: HotelId): Promise<HotelSummary | undefined>;
}
