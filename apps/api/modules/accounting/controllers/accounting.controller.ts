import type { RequestHandler } from "express";
import { listAccounting } from "../services/accounting.service";

export const listAccountingHandler: RequestHandler = () => {
  listAccounting();
};
