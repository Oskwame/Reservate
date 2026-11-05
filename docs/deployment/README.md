# Deployment

## Build

```bash
npm ci
npm run build
```

Outputs:

- `apps/web/.next` — Next.js production build. Run with `npm run start --workspace @htms/web`.
- `apps/api/dist/server.js` — bundled ESM API. Run with `node apps/api/dist/server.js`.

The API bundles `@htms/*` workspace packages with tsup; `express`, `pino`, `helmet`, `cors`,
`dotenv`, and `zod` remain external and must be installed in the runtime environment.

## Environment

API:

| Variable       | Required | Default                 |
| -------------- | -------- | ----------------------- |
| `NODE_ENV`     | no       | `development`           |
| `PORT`         | no       | `4000`                  |
| `CORS_ORIGIN`  | no       | `http://localhost:3000` |
| `LOG_LEVEL`    | no       | `info`                  |
| `DATABASE_URL` | no       | unset                   |

`DATABASE_URL` is required when running Prisma commands or enabling database-backed
repositories. The current scaffold still uses the in-memory store.

Web:

| Variable              | Required | Default                 |
| --------------------- | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | no       | `http://localhost:4000` |

Set `CORS_ORIGIN` to a comma-separated list for multiple origins, or `*` to allow all.

## Deployment topology

- Deploy `apps/web` to a Node host or platform that supports Next.js (Vercel, Docker, etc.).
- Deploy `apps/api` as a long-running Node service behind a reverse proxy.
- Terminate TLS at the proxy and forward `X-Forwarded-*` headers.
- Route `/api/v1/*` to the API, or point the web app at a separate API hostname.

## Health checks

Use `GET /api/v1/health` for readiness and liveness. It returns `200` while dependencies are
healthy. Replace the in-memory database check before production traffic.

## Process management

The API handles `SIGINT` and `SIGTERM` with a 10-second graceful shutdown window. Configure
your orchestrator's termination grace period above that value.

## CI outline

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Cache `node_modules` and `.turbo` between runs. When database-backed repositories are enabled,
run `npm run db:deploy -w @htms/api` as a separate release step before starting the API.
