import type { AccountingMetric, LedgerEntry } from "../types/accounting";
import { sampleAccountingMetrics, sampleLedger } from "./sample-ledger";

export function listLedgerEntries(): LedgerEntry[] {
  return sampleLedger;
}

export function listAccountingMetrics(): AccountingMetric[] {
  return sampleAccountingMetrics;
}
