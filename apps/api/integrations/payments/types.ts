import type { Currency } from "@htms/types";

export type PaymentProviderName = "stripe" | "adyen" | "manual";

export interface PaymentIntentInput {
  amount: number;
  currency: Currency;
  reference: string;
  description?: string;
}

export interface PaymentIntentResult {
  id: string;
  status: "pending" | "succeeded" | "failed";
  clientSecret?: string;
}

export interface RefundInput {
  paymentId: string;
  amount?: number;
}

export interface PaymentProvider {
  name: PaymentProviderName;
  createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult>;
  refund(input: RefundInput): Promise<PaymentIntentResult>;
  healthCheck(): Promise<boolean>;
}
