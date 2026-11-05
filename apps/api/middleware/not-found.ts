import type { RequestHandler } from "express";
import { sendError } from "../utils/response";

export const notFound: RequestHandler = (request, response) => {
  sendError(
    response,
    404,
    "NOT_FOUND",
    `Route ${request.method} ${request.originalUrl} was not found`,
  );
};
