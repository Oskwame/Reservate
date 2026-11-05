import { AppError } from "../../../utils/errors";

export function listPayment(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The payments module is not implemented yet");
}
