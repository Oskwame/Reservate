# Architecture

## Overview

```
┌────────────────────┐        HTTP        ┌────────────────────┐
│  apps/web          │ ─────────────────▶ │  apps/api          │
│  Next.js App Router│  /api/v1/*         │  Express 5         │
└─────────┬──────────┘                    └─────────┬──────────┘
          │                                         │
          │ imports                                 │ imports
          ▼                                         ▼
┌───────────────────────────────────────────────────────────────┐
│ packages: types · validation · shared · config                │
└───────────────────────────────────────────────────────────────┘
```

## How everything connects

```
Hotel staff / administrators
Receptionist · Manager · Accountant · Housekeeper
                    │
                    ▼
Frontend — Next.js (apps/web)
Pages · Components · Features · Hooks · API client
                    │  HTTP / REST via app/api/[...proxy]
                    ▼
Backend — Express + TypeScript (apps/api)
Middleware — authentication · authorization · validation
Business modules — reservations · rooms · POS · inventory · payments
Services and repositories — business rules · data access
          ┌─────────┴─────────┐
          ▼                   ▼
PostgreSQL (Prisma)     External services
persistence             Email · SMS · Payments · Storage
```

Both applications consume the shared packages:

```
packages: types · validation · shared · config
```

- Hotel staff operate the hotel through the dashboard in `apps/web`.
- The frontend calls the API over HTTP/REST; the Next.js proxy route keeps browser calls
  same-origin.
- `apps/api` applies cross-cutting middleware, routes to a business module, enforces rules in
  a service, and reads or writes through a repository.
- Repositories persist through Prisma to PostgreSQL. The in-memory store remains the default
  until the persistence migration is complete.
- Services call the integration adapters (`email`, `sms`, `payments`, `storage`) for
  external work.
- `@htms/types`, `@htms/validation`, `@htms/shared`, and `@htms/config` are imported by both
  apps so contracts and rules stay in sync.

## Applications

### `apps/web`

Next.js App Router application. It renders the operations dashboard, owns presentation
components (`components/`), feature modules (`features/`), client hooks (`hooks/`), and
browser-side API access (`lib/api.ts`).

Routes are grouped by layout:

- `app/(dashboard)/` holds the operations shell and its pages (`/dashboard`, `/reservations`,
  `/rooms`, `/guests`, `/housekeeping`, `/pos`, `/inventory`, `/accounting`, `/reports`).
- `app/(auth)/` holds the sign-in and password-reset screens.
- `app/api/[...proxy]/route.ts` forwards `/api/*` requests to the API origin so browser
  calls avoid cross-origin requests in production.

`/` redirects to `/dashboard` (configured in `next.config.ts`). Server components can call
the API directly with `apiFetch`. Client components that poll the API set
`NEXT_PUBLIC_API_URL`, while the proxy route reads `API_URL` on the server.

#### Feature modules

Business logic is grouped by feature under `features/<feature>/` instead of being mixed
into `components/`. Each feature exposes a public barrel and only the layers it needs:

```
features/reservations/
├── components/
├── hooks/
├── schemas/
├── services/
├── types/
└── index.ts
```

| Folder        | Responsibility                                                          |
| ------------- | ----------------------------------------------------------------------- |
| `components/` | Feature-specific presentation components                                |
| `hooks/`      | Client hooks scoped to the feature                                      |
| `schemas/`    | Feature-facing Zod schemas, usually re-exported from `@htms/validation` |
| `services/`   | Data access and feature business logic behind a callable API            |
| `types/`      | Feature-local view models and DTOs                                      |
| `index.ts`    | The only import path other code should use (`@/features/<feature>`)     |

Pages in `app/` compose feature modules; they do not hold mock data or business rules.
`procurement`, `payments`, and `notifications` are registered as reserved feature modules
until their screens are implemented.

### `apps/api`

Express 5 API organized by feature module:

- `modules/<feature>/` uses a layered layout: controllers, services, repositories, routes,
  validators, types, and a public `index.ts`.
- `middleware/` contains cross-cutting request handling (logging, 404, errors).
- `database/` contains the in-memory persistence seam plus the Prisma/PostgreSQL schema,
  client, transactions, migrations, and seed script.
- `config/` centralizes runtime configuration:
  - `env.ts` validates environment variables with Zod.
  - `database.ts` defines the persistence driver and pool settings.
  - `cors.ts` derives allowed origins from `CORS_ORIGIN`.
  - `logger.ts` creates the shared Pino logger.
  - `redis.ts` exposes optional cache/session settings.
  - `security.ts` holds Helmet, body-limit, trust-proxy, and rate-limit settings.
- `jobs/` defines scheduled background work with a registry for lookup and manual execution.
  Jobs awaiting their domain module remain registered but disabled.
- `integrations/` defines external-service adapters by channel: `email/`, `sms/`, `payments/`,
  `storage/`, and `external-apis/`. Each folder exposes provider contracts through its
  `index.ts`; concrete providers register through the integration registry.
- `utils/` contains shared backend primitives: dates, currency, pagination, API responses,
  reference generation, encryption/password helpers, and application errors.

### API module structure

```
modules/reservations/
├── controllers/reservation.controller.ts
├── services/reservation.service.ts
├── repositories/reservation.repository.ts
├── routes/reservation.routes.ts
├── validators/reservation.validator.ts
├── types/reservation.types.ts
└── index.ts
```

| Layer           | Responsibility                                                   |
| --------------- | ---------------------------------------------------------------- |
| `controllers/`  | Receive HTTP requests, validate input, and return HTTP responses |
| `services/`     | Contain business logic and enforce business rules                |
| `repositories/` | Handle data access through the `Store<T>` persistence seam       |
| `routes/`       | Define endpoints and connect them to controllers                 |
| `validators/`   | Re-export and compose Zod schemas from `@htms/validation`        |
| `types/`        | Define module-local DTOs, command types, and filters             |
| `index.ts`      | Expose the router plus service functions other modules may call  |

Rules:

1. Controllers never reach into `database/` directly.
2. Repositories contain no HTTP, Express, or Zod code.
3. Cross-module calls go through the other module's `index.ts`, not its repository.
4. `@htms/types` remains the source of truth for domain entities; module `types/` adds DTOs.
5. Not every module needs all layers; read-only modules such as `reports` may omit repositories.

`rooms` and `reservations` are fully implemented. The remaining business modules are
scaffolded and their list endpoint returns `501 NOT_IMPLEMENTED` until they are filled in.

## Packages

| Package            | Responsibility                                         |
| ------------------ | ------------------------------------------------------ |
| `@htms/types`      | Domain entities and constant tuples (`as const`)       |
| `@htms/validation` | Zod schemas and inferred request input types           |
| `@htms/shared`     | Framework-agnostic helpers (money, dates, pagination)  |
| `@htms/config`     | Shared constants such as the API prefix and page sizes |

### Shared validation

`@htms/validation` is the single source of validation rules for both applications. Schemas
are grouped by domain:

- `auth.schema.ts`: login, password reset/change, and user-role rules.
- `guest.schema.ts`: guest profiles, guest queries, and guest ID params.
- `room.schema.ts`: room create/update payloads and room queries.
- `reservation.schema.ts`: reservation create/status/cancel payloads and queries.
- `payment.schema.ts`: payment create/status/refund payloads and queries.
- `common.schema.ts` and `pagination.schema.ts`: reusable primitives such as IDs, email,
  passwords, country codes, currencies, and pagination.

Web feature `schemas/` barrels re-export these schemas for client forms. API module
`validators/` barrels re-export the same schemas for controllers. Controllers must always
parse incoming `body`, `query`, and `params` independently; browser-side validation is a UX
convenience, not a security boundary.

Packages are source-only: `main`, `types`, and `exports` point at `src/index.ts`. Next.js
transpiles them via `transpilePackages`, and the API bundles them with tsup. TypeScript
paths in `tsconfig.base.json` let every workspace type-check without a build step.

## Dependency rules

1. `types` depends on nothing.
2. `config` may import types only.
3. `shared` may import types only.
4. `validation` may import `config` and `types`.
5. Apps may import any package, but packages never import apps.
6. Prefer importing from a package barrel (`@htms/...`), not deep paths.

## Request flow

1. Express receives the request and applies Helmet, CORS, JSON parsing, and request logging.
2. The module router forwards the request to a controller.
3. The controller parses `request.query`, `request.params`, or `request.body` with a Zod
   schema from its `validators/` layer and calls a service.
4. The service applies business rules and reads or writes through a repository.
5. The repository uses the persistence seam in `database/`.
6. Errors are normalized by `middleware/error-handler.ts` into `{ error: { code, message } }`.
7. The web app consumes the typed response via `apiFetch<T>`.

## Conventions

- TypeScript is strict, including `noUncheckedIndexedAccess` and `verbatimModuleSyntax`.
- API errors use `AppError` with an HTTP status, stable machine code, and message.
- Domain enums are tuple constants in `@htms/types`, and Zod reuses them to avoid drift.
- Keep feature logic in services; routers stay thin.
