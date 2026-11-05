export type EntryType = "revenue" | "expense" | "payment";

export interface LedgerEntry {
  date: string;
  reference: string;
  description: string;
  type: EntryType;
  amount: number;
}

export interface AccountingMetric {
  label: string;
  value: number;
  hint: string;
}
