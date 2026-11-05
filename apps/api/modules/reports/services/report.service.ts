import { AppError } from "../../../utils/errors";

export function listReport(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The reports module is not implemented yet");
}
