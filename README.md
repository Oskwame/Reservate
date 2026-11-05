# Hotel Management System

A Turborepo monorepo for hotel operations: a Next.js dashboard and an Express/TypeScript API, with shared domain types, validation, utilities, and configuration.

## Requirements

- Node.js >= 22
- npm >= 11

## Getting started

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000
- Health: http://localhost:4000/api/v1/health

## Workspace layout

```
apps/
  web/        Next.js App Router dashboard
  api/        Express 5 API (modules, middleware, database, jobs, integrations)
packages/
  types/      Domain types and constant tuples
  validation/ Zod schemas and inferred input types
  shared/     Framework-agnostic helpers (money, dates, pagination)
  config/     Shared application constants
docs/         Architecture, database, API, testing, and deployment notes
```

## Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Run web and API in watch mode       |
| `npm run build`        | Build all workspaces                |
| `npm run typecheck`    | Type-check all workspaces           |
| `npm run lint`         | Lint all workspaces                 |
| `npm run test`         | Run workspace tests                 |
| `npm run format`       | Format the repository with Prettier |
| `npm run format:check` | Verify formatting                   |

## API endpoints

| Method | Path                              | Description                    |
| ------ | --------------------------------- | ------------------------------ |
| GET    | `/api/v1/health`                  | Service and dependency status  |
| GET    | `/api/v1/rooms`                   | List rooms (filter + paginate) |
| GET    | `/api/v1/rooms/:id`               | Get a room                     |
| POST   | `/api/v1/rooms`                   | Create a room                  |
| PATCH  | `/api/v1/rooms/:id`               | Update a room                  |
| DELETE | `/api/v1/rooms/:id`               | Delete a room                  |
| GET    | `/api/v1/reservations`            | List reservations              |
| POST   | `/api/v1/reservations`            | Create a reservation           |
| PATCH  | `/api/v1/reservations/:id/status` | Change reservation status      |

The scaffold uses an in-memory data store so it runs without external services. Prisma and
PostgreSQL infrastructure is available under `apps/api/database` for the persistence migration.
See `docs/database/README.md` for setup and migration commands.

## Documentation

- [Architecture](docs/architecture/README.md)
- [Database](docs/database/README.md)
- [API](docs/api/README.md)
- [Testing](docs/testing/README.md)
- [Deployment](docs/deployment/README.md)
