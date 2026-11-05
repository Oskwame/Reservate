import { AppError } from "../../../utils/errors";

export function listAuth(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The auth module is not implemented yet");
}
