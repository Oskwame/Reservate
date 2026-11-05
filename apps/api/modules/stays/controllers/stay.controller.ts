import type { RequestHandler } from "express";
import { listStay } from "../services/stay.service";

export const listStayHandler: RequestHandler = () => {
  listStay();
};
