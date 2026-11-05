import type { RequestHandler } from "express";
import { listHousekeeping } from "../services/housekeeping.service";

export const listHousekeepingHandler: RequestHandler = () => {
  listHousekeeping();
};
