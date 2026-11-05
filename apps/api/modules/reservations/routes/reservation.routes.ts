import { Router } from "express";
import {
  createReservationHandler,
  listReservationsHandler,
  updateReservationStatusHandler,
} from "../controllers/reservation.controller";

export const reservationsRouter = Router();

reservationsRouter.get("/", listReservationsHandler);
reservationsRouter.post("/", createReservationHandler);
reservationsRouter.patch("/:id/status", updateReservationStatusHandler);
