import { AppError } from "../../../utils/errors";

export function listNotification(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The notifications module is not implemented yet");
}
