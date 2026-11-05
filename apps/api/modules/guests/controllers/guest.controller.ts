import type { RequestHandler } from "express";
import { listGuest } from "../services/guest.service";

export const listGuestHandler: RequestHandler = () => {
  listGuest();
};
