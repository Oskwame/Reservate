import type { Currency, ISODateString, UUID } from "./common";

export const RESERVATION_STATUSES = [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
  "no_show",
] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export interface Guest {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Reservation {
  id: UUID;
  code: string;
  guest: Guest;
  roomId: UUID;
  checkIn: ISODateString;
  checkOut: ISODateString;
  guests: number;
  status: ReservationStatus;
  totalAmount: number;
  currency: Currency;
  notes?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
