import { Router } from "express";
import { listRoleHandler } from "../controllers/role.controller";

export const rolesRouter = Router();

rolesRouter.get("/", listRoleHandler);
