import type { RequestHandler } from "express";
import {
  createReservationSchema,
  reservationIdParamsSchema,
  reservationQuerySchema,
  updateReservationStatusSchema,
} from "../validators/reservation.validator";
import {
  createReservation,
  listReservations,
  updateReservationStatus,
} from "../services/reservation.service";
import { sendCreated, sendResponse } from "../../../utils/response";

export const listReservationsHandler: RequestHandler = (request, response) => {
  const query = reservationQuerySchema.parse(request.query);
  sendResponse(response, listReservations(query));
};

export const createReservationHandler: RequestHandler = (request, response) => {
  const input = createReservationSchema.parse(request.body);
  sendCreated(response, createReservation(input));
};

export const updateReservationStatusHandler: RequestHandler = (request, response) => {
  const { id } = reservationIdParamsSchema.parse(request.params);
  const { status } = updateReservationStatusSchema.parse(request.body);
  sendResponse(response, updateReservationStatus(id, status));
};
