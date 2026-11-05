import { AppError } from "../../../utils/errors";

export function listUser(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The users module is not implemented yet");
}
