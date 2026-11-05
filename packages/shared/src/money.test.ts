import assert from "node:assert/strict";
import { test } from "node:test";
import { formatCurrency, roundMoney } from "./money";

test("formatCurrency formats USD values", () => {
  assert.equal(formatCurrency(249.5, "USD"), "$249.50");
});

test("roundMoney rounds to two decimal places", () => {
  assert.equal(roundMoney(10.005), 10.01);
  assert.equal(roundMoney(10.004), 10);
});
