import type { Guest } from "@htms/types";
import { sampleReservations } from "@/features/reservations";

export function listGuests(): Guest[] {
  return Array.from(
    new Map(
      sampleReservations.map((reservation) => [reservation.guest.id, reservation.guest] as const),
    ).values(),
  );
}
