import { AppError } from "../../../utils/errors";

export function listAccounting(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The accounting module is not implemented yet");
}
