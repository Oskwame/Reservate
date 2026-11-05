export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  static badRequest(message: string, code = "BAD_REQUEST", details?: unknown): AppError {
    return new AppError(400, code, message, details);
  }

  static unauthorized(message = "Authentication is required", code = "UNAUTHORIZED"): AppError {
    return new AppError(401, code, message);
  }

  static forbidden(message = "Access is denied", code = "FORBIDDEN"): AppError {
    return new AppError(403, code, message);
  }

  static notFound(message: string, code = "NOT_FOUND"): AppError {
    return new AppError(404, code, message);
  }

  static conflict(message: string, code = "CONFLICT"): AppError {
    return new AppError(409, code, message);
  }

  static unprocessable(
    message: string,
    code = "UNPROCESSABLE_ENTITY",
    details?: unknown,
  ): AppError {
    return new AppError(422, code, message, details);
  }

  static tooManyRequests(message = "Too many requests", code = "RATE_LIMITED"): AppError {
    return new AppError(429, code, message);
  }

  static notImplemented(message: string, code = "NOT_IMPLEMENTED"): AppError {
    return new AppError(501, code, message);
  }

  static internal(message = "An unexpected error occurred", code = "INTERNAL_ERROR"): AppError {
    return new AppError(500, code, message);
  }

  static serviceUnavailable(
    message = "Service is unavailable",
    code = "SERVICE_UNAVAILABLE",
  ): AppError {
    return new AppError(503, code, message);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
