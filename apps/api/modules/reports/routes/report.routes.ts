import { Router } from "express";
import { listReportHandler } from "../controllers/report.controller";

export const reportsRouter = Router();

reportsRouter.get("/", listReportHandler);
