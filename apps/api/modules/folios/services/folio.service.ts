import { AppError } from "../../../utils/errors";

export function listFolio(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The folios module is not implemented yet");
}
