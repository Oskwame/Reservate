import { Router } from "express";
import { listStayHandler } from "../controllers/stay.controller";

export const staysRouter = Router();

staysRouter.get("/", listStayHandler);
