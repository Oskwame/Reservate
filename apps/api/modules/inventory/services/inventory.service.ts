import { AppError } from "../../../utils/errors";

export function listInventory(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The inventory module is not implemented yet");
}
