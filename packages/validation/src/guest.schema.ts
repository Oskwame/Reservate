import { z } from "zod";
import { countryCodeSchema, emailSchema, idSchema, nameSchema, phoneSchema } from "./common.schema";
import { paginationQuerySchema } from "./pagination.schema";

export const guestInputSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  country: countryCodeSchema.optional(),
});

export const createGuestSchema = guestInputSchema;

export const updateGuestSchema = guestInputSchema.partial();

export const guestQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().min(1).max(100).optional(),
  country: countryCodeSchema.optional(),
});

export const guestIdParamsSchema = z.object({
  id: idSchema,
});

export type GuestInput = z.infer<typeof guestInputSchema>;
export type CreateGuestInput = z.infer<typeof createGuestSchema>;
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;
export type GuestQuery = z.infer<typeof guestQuerySchema>;
export type GuestIdParams = z.infer<typeof guestIdParamsSchema>;
