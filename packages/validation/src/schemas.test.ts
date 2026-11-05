import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createGuestSchema,
  createPaymentSchema,
  createReservationSchema,
  createRoomSchema,
  loginSchema,
  paginationQuerySchema,
  resetPasswordSchema,
} from "./index";

test("login normalizes email and defaults remember to false", () => {
  const input = loginSchema.parse({
    email: " Manager@Example.COM ",
    password: "secret",
  });

  assert.equal(input.email, "manager@example.com");
  assert.equal(input.remember, false);
});

test("auth schemas reject invalid credentials and weak reset tokens", () => {
  assert.equal(loginSchema.safeParse({ email: "not-an-email", password: "x" }).success, false);

  assert.equal(
    resetPasswordSchema.safeParse({ token: "short", password: "long-enough" }).success,
    false,
  );
});

test("guest schema trims names, normalizes email, and uppercases country codes", () => {
  const guest = createGuestSchema.parse({
    firstName: "  Ada ",
    lastName: " Lovelace ",
    email: "ADA@EXAMPLE.COM",
    country: "gb",
  });

  assert.deepEqual(guest, {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    country: "GB",
  });
});

test("room schema applies defaults and rejects non-positive rates", () => {
  const room = createRoomSchema.parse({
    number: " 610 ",
    name: " Attic Studio ",
    type: "single",
    floor: 6,
    capacity: 1,
    nightlyRate: 140,
  });

  assert.equal(room.number, "610");
  assert.equal(room.currency, "USD");
  assert.deepEqual(room.amenities, []);

  assert.equal(
    createRoomSchema.safeParse({
      number: "611",
      name: "Invalid",
      type: "single",
      floor: 6,
      capacity: 1,
      nightlyRate: 0,
    }).success,
    false,
  );
});

test("reservation schema requires checkout after check-in", () => {
  const base = {
    roomId: "room-101",
    guest: {
      firstName: "Jonas",
      lastName: "Weber",
      email: "jonas@example.com",
    },
    checkIn: "2026-12-12",
    checkOut: "2026-12-15",
    guests: 2,
  };

  assert.equal(createReservationSchema.safeParse(base).success, true);
  assert.equal(
    createReservationSchema.safeParse({ ...base, checkOut: "2026-12-12" }).success,
    false,
  );
  assert.equal(
    createReservationSchema.safeParse({ ...base, checkIn: "12/12/2026" }).success,
    false,
  );
});

test("payment schema defaults currency and rejects invalid amounts", () => {
  const payment = createPaymentSchema.parse({
    invoiceId: "invoice-1",
    provider: " stripe ",
    amount: 120,
  });

  assert.equal(payment.provider, "stripe");
  assert.equal(payment.currency, "USD");

  assert.equal(
    createPaymentSchema.safeParse({
      invoiceId: "invoice-1",
      provider: "stripe",
      amount: -1,
    }).success,
    false,
  );
});

test("pagination schema coerces query strings and enforces page size", () => {
  assert.deepEqual(paginationQuerySchema.parse({}), { page: 1, pageSize: 20 });
  assert.deepEqual(paginationQuerySchema.parse({ page: "2", pageSize: "50" }), {
    page: 2,
    pageSize: 50,
  });
  assert.equal(paginationQuerySchema.safeParse({ page: "0" }).success, false);
  assert.equal(paginationQuerySchema.safeParse({ pageSize: "101" }).success, false);
});
