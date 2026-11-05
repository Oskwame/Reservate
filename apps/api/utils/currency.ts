import { roundMoney } from "@htms/shared";

export { formatCurrency, roundMoney } from "@htms/shared";

function assertFractionDigits(fractionDigits: number): void {
  if (!Number.isInteger(fractionDigits) || fractionDigits < 0) {
    throw new RangeError("Fraction digits must be a non-negative integer");
  }
}

export function sumMoney(amounts: readonly number[]): number {
  return roundMoney(amounts.reduce((total, amount) => total + amount, 0));
}

export function multiplyMoney(amount: number, quantity: number): number {
  return roundMoney(amount * quantity);
}

export function toMinorUnits(amount: number, fractionDigits = 2): number {
  assertFractionDigits(fractionDigits);
  return Math.round(amount * 10 ** fractionDigits);
}

export function fromMinorUnits(amount: number, fractionDigits = 2): number {
  assertFractionDigits(fractionDigits);
  return roundMoney(amount / 10 ** fractionDigits);
}
