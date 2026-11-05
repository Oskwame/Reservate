import { AppError } from "../../../utils/errors";

export function listProcurement(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The procurement module is not implemented yet");
}
