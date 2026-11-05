import { addDays } from "@htms/shared";
import { logger } from "../config/logger";
import { reservationRepository } from "../modules/reservations/repositories/reservation.repository";
import type { JobDefinition } from "./types";

const reminderWindowDays = 1;

export const reservationRemindersJob: JobDefinition = {
  name: "reservation-reminders",
  description: "Identifies confirmed reservations with arrivals due in the reminder window.",
  schedule: "0 8 * * *",
  enabled: true,
  async run(): Promise<void> {
    const today = new Date().toISOString().slice(0, 10);
    const arrivalDate = addDays(today, reminderWindowDays);
    const reservations = reservationRepository
      .all()
      .filter(
        (reservation) => reservation.status === "confirmed" && reservation.checkIn === arrivalDate,
      );

    logger.info(
      {
        job: "reservation-reminders",
        arrivalDate,
        count: reservations.length,
        reservationIds: reservations.map((reservation) => reservation.id),
      },
      "Reservation reminder candidates collected",
    );
  },
};
