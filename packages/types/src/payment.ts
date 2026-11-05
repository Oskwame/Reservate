import type { Currency, ISODateString, UUID } from "./common";

export const PAYMENT_STATUSES = ["pending", "succeeded", "failed", "refunded"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface Payment {
  id: UUID;
  invoiceId: UUID;
  provider: string;
  providerReference?: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  paidAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
