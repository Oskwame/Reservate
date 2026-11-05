import type { RequestHandler } from "express";
import { listPos } from "../services/pos.service";

export const listPosHandler: RequestHandler = () => {
  listPos();
};
