import type { RequestHandler } from "express";
import { listAuth } from "../services/auth.service";

export const listAuthHandler: RequestHandler = () => {
  listAuth();
};
