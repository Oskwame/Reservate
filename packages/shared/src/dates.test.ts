import assert from "node:assert/strict";
import { test } from "node:test";
import { addDays, calculateNights, formatDate } from "./dates";

test("calculateNights counts whole nights between dates", () => {
  assert.equal(calculateNights("2026-11-01", "2026-11-04"), 3);
  assert.equal(calculateNights("2026-11-01", "2026-11-01"), 0);
});

test("calculateNights rejects invalid dates", () => {
  assert.throws(() => calculateNights("not-a-date", "2026-11-04"), RangeError);
});

test("addDays returns an ISO date", () => {
  assert.equal(addDays("2026-11-01", 5), "2026-11-06");
});

test("formatDate renders a readable date", () => {
  assert.equal(formatDate("2026-11-01"), "Nov 1, 2026");
});
