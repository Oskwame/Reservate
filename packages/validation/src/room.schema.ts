import { ROOM_STATUSES, ROOM_TYPES } from "@htms/types";
import { z } from "zod";
import { currencySchema, idSchema } from "./common.schema";
import { paginationQuerySchema } from "./pagination.schema";

export const roomTypeSchema = z.enum(ROOM_TYPES);

export const roomStatusSchema = z.enum(ROOM_STATUSES);

export const roomQuerySchema = paginationQuerySchema.extend({
  status: roomStatusSchema.optional(),
  type: roomTypeSchema.optional(),
});

export const createRoomSchema = z.object({
  number: z.string().trim().min(1).max(10),
  name: z.string().trim().min(1).max(120),
  type: roomTypeSchema,
  floor: z.number().int().min(0).max(200),
  capacity: z.number().int().min(1).max(12),
  nightlyRate: z.number().positive().max(1_000_000),
  currency: currencySchema.default("USD"),
  amenities: z.array(z.string().trim().min(1).max(60)).max(30).default([]),
});

export const updateRoomSchema = createRoomSchema.partial();

export const roomIdParamsSchema = z.object({
  id: idSchema,
});

export type RoomQuery = z.infer<typeof roomQuerySchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type RoomIdParams = z.infer<typeof roomIdParamsSchema>;
