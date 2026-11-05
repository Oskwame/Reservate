import { AppError } from "../../../utils/errors";

export function listStay(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The stays module is not implemented yet");
}
