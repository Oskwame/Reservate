import { Router } from "express";
import { listFolioHandler } from "../controllers/folio.controller";

export const foliosRouter = Router();

foliosRouter.get("/", listFolioHandler);
