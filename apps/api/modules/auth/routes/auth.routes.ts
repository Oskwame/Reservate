import { Router } from "express";
import { listAuthHandler } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.get("/", listAuthHandler);
