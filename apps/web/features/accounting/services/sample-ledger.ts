import type { AccountingMetric, LedgerEntry } from "../types/accounting";

export const sampleLedger: LedgerEntry[] = [
  {
    date: "2026-11-01",
    reference: "INV-2041",
    description: "Room revenue — city ledger",
    type: "revenue",
    amount: 8420,
  },
  {
    date: "2026-11-01",
    reference: "PAY-1180",
    description: "Card settlement — booking platform",
    type: "payment",
    amount: 5260,
  },
  {
    date: "2026-11-01",
    reference: "EXP-0925",
    description: "Laundry and linen service",
    type: "expense",
    amount: 1180,
  },
  {
    date: "2026-10-31",
    reference: "INV-2039",
    description: "Restaurant and bar revenue",
    type: "revenue",
    amount: 3140,
  },
  {
    date: "2026-10-31",
    reference: "EXP-0921",
    description: "Kitchen produce order",
    type: "expense",
    amount: 2260,
  },
];

export const sampleAccountingMetrics: AccountingMetric[] = [
  {
    label: "Revenue MTD",
    value: 128420,
    hint: "rooms, F&B, and extras",
  },
  {
    label: "Outstanding",
    value: 14260,
    hint: "city ledger balance",
  },
  {
    label: "Expenses",
    value: 61890,
    hint: "operations and payroll",
  },
  {
    label: "Net",
    value: 66530,
    hint: "before tax",
  },
];
