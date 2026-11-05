import { AppError } from "../../../utils/errors";

export function listHotel(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The hotel module is not implemented yet");
}
