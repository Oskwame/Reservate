import type { Reservation } from "@htms/types";
import { reservationStore } from "../../../database";

export interface ReservationRepository {
  all(): Reservation[];
  findById(id: string): Reservation | undefined;
  save(reservation: Reservation): Reservation;
  update(id: string, updater: (reservation: Reservation) => Reservation): Reservation | undefined;
}

export const reservationRepository: ReservationRepository = {
  all: () => reservationStore.all(),
  findById: (id) => reservationStore.findById(id),
  save: (reservation) => reservationStore.insert(reservation),
  update: (id, updater) => reservationStore.update(id, updater),
};
