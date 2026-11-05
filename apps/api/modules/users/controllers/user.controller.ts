import type { RequestHandler } from "express";
import { listUser } from "../services/user.service";

export const listUserHandler: RequestHandler = () => {
  listUser();
};
