import { randomUUID } from "node:crypto";
import { calculateNights, paginate, roundMoney } from "@htms/shared";
import type { Guest, Paginated, Reservation } from "@htms/types";
import { getRoom } from "../../rooms";
import { reservationRepository } from "../repositories/reservation.repository";
import type { CreateReservationCommand, ReservationListQuery } from "../types/reservation.types";
import { AppError } from "../../../utils/errors";
import { generateReservationReference } from "../../../utils/generate-reference";

const activeStatuses: Reservation["status"][] = ["pending", "confirmed", "checked_in"];

function timestamp(): string {
  return new Date().toISOString();
}

function assertRoomAvailable(roomId: string, checkIn: string, checkOut: string): void {
  const overlapping = reservationRepository
    .all()
    .find(
      (reservation) =>
        reservation.roomId === roomId &&
        activeStatuses.includes(reservation.status) &&
        reservation.checkIn < checkOut &&
        reservation.checkOut > checkIn,
    );

  if (overlapping) {
    throw AppError.conflict(
      `Room ${roomId} is already booked between ${checkIn} and ${checkOut}`,
      "ROOM_UNAVAILABLE",
    );
  }
}

export function listReservations(query: ReservationListQuery): Paginated<Reservation> {
  const reservations = reservationRepository.all().filter((reservation) => {
    const matchesStatus = !query.status || reservation.status === query.status;
    const matchesRoom = !query.roomId || reservation.roomId === query.roomId;
    return matchesStatus && matchesRoom;
  });

  reservations.sort((left, right) => left.checkIn.localeCompare(right.checkIn));

  return paginate(reservations, query.page, query.pageSize);
}

export function createReservation(input: CreateReservationCommand): Reservation {
  const room = getRoom(input.roomId);
  const nights = calculateNights(input.checkIn, input.checkOut);

  if (nights < 1) {
    throw AppError.badRequest("Reservation must span at least one night", "INVALID_STAY");
  }

  if (input.guests > room.capacity) {
    throw AppError.badRequest(
      `Room ${room.number} accommodates up to ${room.capacity} guests`,
      "CAPACITY_EXCEEDED",
    );
  }

  assertRoomAvailable(room.id, input.checkIn, input.checkOut);

  const now = timestamp();
  const guest: Guest = {
    id: randomUUID(),
    firstName: input.guest.firstName,
    lastName: input.guest.lastName,
    email: input.guest.email,
    phone: input.guest.phone,
    country: input.guest.country,
    createdAt: now,
    updatedAt: now,
  };

  const reservation: Reservation = {
    id: randomUUID(),
    code: generateReservationReference(),
    guest,
    roomId: room.id,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    status: "confirmed",
    totalAmount: roundMoney(nights * room.nightlyRate),
    currency: room.currency,
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  };

  return reservationRepository.save(reservation);
}

export function updateReservationStatus(id: string, status: Reservation["status"]): Reservation {
  const updated = reservationRepository.update(id, (reservation) => ({
    ...reservation,
    status,
    updatedAt: timestamp(),
  }));

  if (!updated) {
    throw AppError.notFound(`Reservation ${id} was not found`, "RESERVATION_NOT_FOUND");
  }

  return updated;
}
