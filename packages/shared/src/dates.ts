const MS_PER_DAY = 86_400_000;

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = Date.parse(checkIn);
  const end = Date.parse(checkOut);

  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new RangeError("Invalid date provided");
  }

  return Math.round((end - start) / MS_PER_DAY);
}

export function formatDate(value: string, locale = "en-US"): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid date provided");
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(date);
}

export function addDays(value: string, days: number): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid date provided");
  }

  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
