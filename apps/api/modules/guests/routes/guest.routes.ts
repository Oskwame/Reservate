import { Router } from "express";
import { listGuestHandler } from "../controllers/guest.controller";

export const guestsRouter = Router();

guestsRouter.get("/", listGuestHandler);
