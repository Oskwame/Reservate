import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors";
import { logger } from "../config/logger";
import { sendError } from "../utils/response";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    sendError(response, 422, "VALIDATION_ERROR", "Request validation failed", error.issues);
    return;
  }

  if (error instanceof AppError) {
    sendError(response, error.statusCode, error.code, error.message, error.details);
    return;
  }

  if (error instanceof SyntaxError && "body" in error) {
    sendError(response, 400, "INVALID_JSON", "Request body must be valid JSON");
    return;
  }

  logger.error({ err: error }, "Unhandled request error");
  sendError(response, 500, "INTERNAL_ERROR", "An unexpected error occurred");
};
