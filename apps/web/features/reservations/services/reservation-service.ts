import type { Reservation, ReservationStatus } from "@htms/types";
import { sampleReservations } from "./sample-reservations";

export function listReservations(): Reservation[] {
  return [...sampleReservations].sort((left, right) => left.checkIn.localeCompare(right.checkIn));
}

export function countReservationsByStatus(
  reservations: Reservation[],
  status: ReservationStatus,
): number {
  return reservations.filter((reservation) => reservation.status === status).length;
}
