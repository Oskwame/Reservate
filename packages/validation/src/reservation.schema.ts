import { RESERVATION_STATUSES } from "@htms/types";
import { z } from "zod";
import { idSchema } from "./common.schema";
import { guestInputSchema } from "./guest.schema";
import { paginationQuerySchema } from "./pagination.schema";

export const reservationStatusSchema = z.enum(RESERVATION_STATUSES);

export const createReservationSchema = z
  .object({
    roomId: idSchema,
    guest: guestInputSchema,
    checkIn: z.iso.date(),
    checkOut: z.iso.date(),
    guests: z.number().int().min(1).max(10),
    notes: z.string().trim().max(500).optional(),
  })
  .refine((value) => value.checkOut > value.checkIn, {
    message: "checkOut must be after checkIn",
    path: ["checkOut"],
  });

export const reservationQuerySchema = paginationQuerySchema.extend({
  status: reservationStatusSchema.optional(),
  roomId: idSchema.optional(),
});

export const updateReservationStatusSchema = z.object({
  status: reservationStatusSchema,
});

export const cancelReservationSchema = z.object({
  reason: z.string().trim().max(500).optional(),
});

export const reservationIdParamsSchema = z.object({
  id: idSchema,
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type ReservationQuery = z.infer<typeof reservationQuerySchema>;
export type UpdateReservationStatusInput = z.infer<typeof updateReservationStatusSchema>;
export type CancelReservationInput = z.infer<typeof cancelReservationSchema>;
export type ReservationIdParams = z.infer<typeof reservationIdParamsSchema>;
