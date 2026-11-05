import { Router } from "express";
import { listPosHandler } from "../controllers/pos.controller";

export const posRouter = Router();

posRouter.get("/", listPosHandler);
