import { Router } from "express";
import { listAccountingHandler } from "../controllers/accounting.controller";

export const accountingRouter = Router();

accountingRouter.get("/", listAccountingHandler);
