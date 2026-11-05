import { PAYMENT_STATUSES } from "@htms/types";
import { z } from "zod";
import { currencySchema, idSchema } from "./common.schema";
import { paginationQuerySchema } from "./pagination.schema";

export const paymentStatusSchema = z.enum(PAYMENT_STATUSES);

export const createPaymentSchema = z.object({
  invoiceId: idSchema,
  provider: z.string().trim().min(1).max(60),
  providerReference: z.string().trim().min(1).max(120).optional(),
  amount: z.number().positive().max(1_000_000),
  currency: currencySchema.default("USD"),
});

export const updatePaymentStatusSchema = z.object({
  status: paymentStatusSchema,
});

export const refundPaymentSchema = z.object({
  amount: z.number().positive().max(1_000_000),
  reason: z.string().trim().max(500).optional(),
});

export const paymentQuerySchema = paginationQuerySchema.extend({
  invoiceId: idSchema.optional(),
  provider: z.string().trim().min(1).max(60).optional(),
  status: paymentStatusSchema.optional(),
});

export const paymentIdParamsSchema = z.object({
  id: idSchema,
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentStatusInput = z.infer<typeof updatePaymentStatusSchema>;
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>;
export type PaymentQuery = z.infer<typeof paymentQuerySchema>;
export type PaymentIdParams = z.infer<typeof paymentIdParamsSchema>;
