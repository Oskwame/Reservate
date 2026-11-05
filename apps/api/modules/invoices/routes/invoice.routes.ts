import { Router } from "express";
import { listInvoiceHandler } from "../controllers/invoice.controller";

export const invoicesRouter = Router();

invoicesRouter.get("/", listInvoiceHandler);
