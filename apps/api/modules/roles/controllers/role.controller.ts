import type { RequestHandler } from "express";
import { listRole } from "../services/role.service";

export const listRoleHandler: RequestHandler = () => {
  listRole();
};
