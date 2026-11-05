import { Router } from "express";
import { listUserHandler } from "../controllers/user.controller";

export const usersRouter = Router();

usersRouter.get("/", listUserHandler);
