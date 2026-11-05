import type { InvoiceId, InvoiceSummary } from "../types/invoice.types";

export interface InvoiceRepository {
  findAll(): Promise<InvoiceSummary[]>;
  findById(id: InvoiceId): Promise<InvoiceSummary | undefined>;
}
