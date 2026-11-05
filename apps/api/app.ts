import { API_PREFIX, APP_NAME } from "@htms/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsOptions } from "./config/cors";
import { securityConfig } from "./config/security";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import { requestLogger } from "./middleware/request-logger";
import { accountingRouter } from "./modules/accounting";
import { authRouter } from "./modules/auth";
import { foliosRouter } from "./modules/folios";
import { guestsRouter } from "./modules/guests";
import { healthRouter } from "./modules/health/health.router";
import { hotelRouter } from "./modules/hotel";
import { housekeepingRouter } from "./modules/housekeeping";
import { inventoryRouter } from "./modules/inventory";
import { invoicesRouter } from "./modules/invoices";
import { notificationsRouter } from "./modules/notifications";
import { paymentsRouter } from "./modules/payments";
import { posRouter } from "./modules/pos";
import { procurementRouter } from "./modules/procurement";
import { reportsRouter } from "./modules/reports";
import { reservationsRouter } from "./modules/reservations";
import { rolesRouter } from "./modules/roles";
import { roomsRouter } from "./modules/rooms";
import { staysRouter } from "./modules/stays";
import { usersRouter } from "./modules/users";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", securityConfig.trustProxy);
  app.use(helmet(securityConfig.helmetOptions));
  app.use(cors(corsOptions));
  app.use(express.json({ limit: securityConfig.jsonBodyLimit }));
  app.use(requestLogger);

  app.get("/", (_request, response) => {
    response.json({
      name: APP_NAME,
      version: "0.1.0",
      api: API_PREFIX,
      health: `${API_PREFIX}/health`,
    });
  });

  app.use(`${API_PREFIX}/health`, healthRouter);
  app.use(`${API_PREFIX}/auth`, authRouter);
  app.use(`${API_PREFIX}/users`, usersRouter);
  app.use(`${API_PREFIX}/roles`, rolesRouter);
  app.use(`${API_PREFIX}/hotel`, hotelRouter);
  app.use(`${API_PREFIX}/rooms`, roomsRouter);
  app.use(`${API_PREFIX}/reservations`, reservationsRouter);
  app.use(`${API_PREFIX}/guests`, guestsRouter);
  app.use(`${API_PREFIX}/stays`, staysRouter);
  app.use(`${API_PREFIX}/housekeeping`, housekeepingRouter);
  app.use(`${API_PREFIX}/pos`, posRouter);
  app.use(`${API_PREFIX}/inventory`, inventoryRouter);
  app.use(`${API_PREFIX}/procurement`, procurementRouter);
  app.use(`${API_PREFIX}/folios`, foliosRouter);
  app.use(`${API_PREFIX}/payments`, paymentsRouter);
  app.use(`${API_PREFIX}/invoices`, invoicesRouter);
  app.use(`${API_PREFIX}/accounting`, accountingRouter);
  app.use(`${API_PREFIX}/reports`, reportsRouter);
  app.use(`${API_PREFIX}/notifications`, notificationsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
