import { randomBytes } from "node:crypto";

const REFERENCE_PREFIXES = {
  reservation: "RES",
  invoice: "INV",
  payment: "PAY",
  transaction: "TXN",
} as const;

export type ReferenceType = keyof typeof REFERENCE_PREFIXES;

function pad(value: number, length = 2): string {
  return value.toString().padStart(length, "0");
}

function formatTimestamp(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid reference date provided");
  }

  return [
    date.getUTCFullYear().toString(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
  ].join("");
}

export function generateReference(type: ReferenceType, date = new Date()): string {
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `${REFERENCE_PREFIXES[type]}-${formatTimestamp(date)}-${suffix}`;
}

export function generateReservationReference(date = new Date()): string {
  return generateReference("reservation", date);
}

export function generateInvoiceReference(date = new Date()): string {
  return generateReference("invoice", date);
}

export function generatePaymentReference(date = new Date()): string {
  return generateReference("payment", date);
}

export function generateTransactionReference(date = new Date()): string {
  return generateReference("transaction", date);
}
