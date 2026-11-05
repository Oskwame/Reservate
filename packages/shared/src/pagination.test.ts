import assert from "node:assert/strict";
import { test } from "node:test";
import { paginate } from "./pagination";

test("paginate slices items and reports totals", () => {
  const items = [1, 2, 3, 4, 5];

  assert.deepEqual(paginate(items, 1, 2), {
    items: [1, 2],
    page: 1,
    pageSize: 2,
    total: 5,
    totalPages: 3,
  });

  assert.deepEqual(paginate(items, 3, 2).items, [5]);
});

test("paginate handles an empty collection", () => {
  const result = paginate([], 1, 20);

  assert.equal(result.total, 0);
  assert.equal(result.totalPages, 0);
  assert.deepEqual(result.items, []);
});
