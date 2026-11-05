import { AppError } from "../../../utils/errors";

export function listHousekeeping(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The housekeeping module is not implemented yet");
}
