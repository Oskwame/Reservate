import type { Currency } from "@htms/types";

const formatters = new Map<string, Intl.NumberFormat>();

export function formatCurrency(amount: number, currency: Currency, locale = "en-US"): string {
  const key = `${locale}:${currency}`;
  let formatter = formatters.get(key);

  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { style: "currency", currency });
    formatters.set(key, formatter);
  }

  return formatter.format(amount);
}

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
