export { addDays, calculateNights, formatDate } from "@htms/shared";

const ISO_DATE_LENGTH = 10;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function toUtcDate(value: Date | string = new Date()): Date {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid date provided");
  }

  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function toIsoDate(value: Date | string = new Date()): string {
  return toUtcDate(value).toISOString().slice(0, ISO_DATE_LENGTH);
}

export function todayIso(): string {
  return toIsoDate();
}

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  return toIsoDate(value) === value;
}
