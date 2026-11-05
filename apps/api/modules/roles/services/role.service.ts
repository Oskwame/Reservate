import { AppError } from "../../../utils/errors";

export function listRole(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The roles module is not implemented yet");
}
