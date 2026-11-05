# Testing

## Current setup

Workspace tests use the built-in Node test runner with `tsx` for TypeScript execution:

```bash
npm run test
```

The `@htms/shared` package contains tests for dates, money, and pagination.
`@htms/validation` tests schema normalization, defaults, and rejection rules. Turbo runs the
`test` task across all workspaces that define it.

## Adding package tests

Create a `*.test.ts` file next to the code and add the file to the package's `test` script:

```json
{
  "scripts": {
    "test": "node --import tsx --test src/my-module.test.ts"
  }
}
```

Then run `npm run test --workspace @htms/shared` (or `npm run test` at the root).

## Adding API tests

Install `supertest` and its types in `apps/api`, then test `createApp()` without binding a
port:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { createApp } from "./app";

test("health endpoint responds", async () => {
  const response = await request(createApp()).get("/api/v1/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
});
```

Because services share module-level stores, reset or re-seed state between tests, or move
stores behind an injectable dependency.

## Suggested coverage

- Reservation overlap and capacity rules.
- Room filtering and pagination boundaries.
- Validation failures (`422`) and not-found paths (`404`).
- Web component rendering and the API health hook.
- End-to-end booking flow with Playwright once authentication exists.
