import type { ApiErrorBody, Paginated } from "@htms/types";
import type { Response } from "express";

export function sendResponse<T>(response: Response, body: T, statusCode = 200): void {
  response.status(statusCode).json(body);
}

export function sendCreated<T>(response: Response, body: T): void {
  sendResponse(response, body, 201);
}

export function sendNoContent(response: Response): void {
  response.status(204).send();
}

export function sendPaginated<T>(response: Response, body: Paginated<T>): void {
  sendResponse(response, body);
}

export function sendError(
  response: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown,
): void {
  const body: ApiErrorBody = {
    error: {
      code,
      message,
      ...(details === undefined ? {} : { details }),
    },
  };

  sendResponse(response, body, statusCode);
}
