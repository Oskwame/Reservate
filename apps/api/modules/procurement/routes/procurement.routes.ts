import { Router } from "express";
import { listProcurementHandler } from "../controllers/procurement.controller";

export const procurementRouter = Router();

procurementRouter.get("/", listProcurementHandler);
