# Database

## Current state

PostgreSQL infrastructure is defined with Prisma ORM, while the running API still uses the
in-memory store unless repositories are migrated:

- `apps/api/database/prisma/schema.prisma` defines the relational model.
- `apps/api/database/prisma/migrations/` contains the initial SQL migration.
- `apps/api/database/prisma/seed.ts` loads the starter rooms, reservation, invoice, and payment.
- `apps/api/database/client.ts` lazily creates the shared Prisma client and PostgreSQL adapter.
- `apps/api/database/transaction.ts` exposes the transaction boundary and typed transaction client.
- `apps/api/database/memory-store.ts`, `seed.ts`, and `index.ts` remain the active runtime store.

The API does not require PostgreSQL to start. `DATABASE_URL` is only needed for Prisma
commands or when code calls `getPrismaClient()`.

## Setup

Set `DATABASE_URL` in `apps/api/.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/htms
```

Run Prisma commands from the repository root:

```bash
npm run db:generate -w @htms/api
npm run db:migrate -w @htms/api
npm run db:seed -w @htms/api
```

`db:generate` also runs after `npm install` through the API package `postinstall` script.
Generated client files live in `apps/api/database/generated/prisma/` and are not committed.

## Prisma layout

```
apps/api/
├── prisma.config.ts
└── database/
    ├── prisma/
    │   ├── schema.prisma
    │   ├── migrations/
    │   └── seed.ts
    ├── client.ts
    ├── transaction.ts
    ├── index.ts
    ├── memory-store.ts
    └── seed.ts
```

`prisma.config.ts` resolves the schema, migrations, seed command, and datasource URL. The
new `prisma-client` generator emits TypeScript with ESM imports into `database/generated/prisma`.

## Models

- `User` with role-based access fields.
- `Room` with a normalized `RoomAmenity` relation.
- `Guest`.
- `Reservation` linked to a guest and room.
- `Invoice` linked to a reservation.
- `Payment` linked to an invoice.

The initial migration also enforces:

- `rooms.capacity > 0`
- `rooms.nightly_rate >= 0`
- `reservations.check_out > reservations.check_in`

Reservation overlap remains an application-level check. A PostgreSQL exclusion constraint can
replace it once date-range booking rules are finalized.

## Client and transactions

`getPrismaClient()` is lazy and throws only when `DATABASE_URL` is absent. The client is cached
on `globalThis` to avoid duplicate pools during development reloads.

Use `withTransaction()` for multi-step writes that must succeed or fail together:

```ts
import { withTransaction } from "../database/transaction";

await withTransaction(async (tx) => {
  const reservation = await tx.reservation.create({ data });
  await tx.invoice.create({ data: { reservationId: reservation.id } });
});
```

## Persistence migration

The Prisma layer is infrastructure-only until repositories move from the memory store:

1. Implement database-backed repositories behind the existing repository interfaces.
2. Move reservation creation and overlap validation into `withTransaction()`.
3. Switch health reporting to a real Prisma connectivity check.
4. Run `prisma migrate deploy` before starting the API in deployment.
5. Remove the in-memory stores once every module is migrated.

## Seeding

`prisma/seed.ts` reuses the sample data in `database/seed.ts` and uses idempotent `upsert`
operations. Keep the stable IDs so sample reservations, invoices, and payments remain
reproducible across environments.
