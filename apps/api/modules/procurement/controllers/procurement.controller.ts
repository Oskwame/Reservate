import type { RequestHandler } from "express";
import { listProcurement } from "../services/procurement.service";

export const listProcurementHandler: RequestHandler = () => {
  listProcurement();
};
