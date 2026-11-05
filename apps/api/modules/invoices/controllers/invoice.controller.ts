import type { RequestHandler } from "express";
import { listInvoice } from "../services/invoice.service";

export const listInvoiceHandler: RequestHandler = () => {
  listInvoice();
};
