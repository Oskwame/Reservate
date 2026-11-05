import { AppError } from "../../../utils/errors";

export function listInvoice(): never {
  throw new AppError(501, "NOT_IMPLEMENTED", "The invoices module is not implemented yet");
}
