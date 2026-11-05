import { AppError } from "../../../utils/errors";

export function listPos(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The pos module is not implemented yet");
}
