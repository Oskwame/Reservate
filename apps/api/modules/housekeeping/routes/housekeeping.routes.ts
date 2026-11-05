import { Router } from "express";
import { listHousekeepingHandler } from "../controllers/housekeeping.controller";

export const housekeepingRouter = Router();

housekeepingRouter.get("/", listHousekeepingHandler);
