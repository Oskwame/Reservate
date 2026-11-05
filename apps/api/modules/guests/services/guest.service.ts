import { AppError } from "../../../utils/errors";

export function listGuest(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The guests module is not implemented yet");
}
