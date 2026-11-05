import type { Currency, ISODateString, UUID } from "./common";

export const ROOM_TYPES = ["single", "double", "twin", "suite", "deluxe"] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_STATUSES = [
  "available",
  "occupied",
  "cleaning",
  "maintenance",
  "out_of_service",
] as const;

export type RoomStatus = (typeof ROOM_STATUSES)[number];

export interface Room {
  id: UUID;
  number: string;
  name: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  capacity: number;
  nightlyRate: number;
  currency: Currency;
  amenities: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
