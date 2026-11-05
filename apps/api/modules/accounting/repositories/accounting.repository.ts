import type { AccountingId, AccountingSummary } from "../types/accounting.types";

export interface AccountingRepository {
  findAll(): Promise<AccountingSummary[]>;
  findById(id: AccountingId): Promise<AccountingSummary | undefined>;
}
