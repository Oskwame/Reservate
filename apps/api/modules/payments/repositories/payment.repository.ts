import type { PaymentId, PaymentSummary } from "../types/payment.types";

export interface PaymentRepository {
  findAll(): Promise<PaymentSummary[]>;
  findById(id: PaymentId): Promise<PaymentSummary | undefined>;
}
