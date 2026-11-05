import type { RequestHandler } from "express";
import { listFolio } from "../services/folio.service";

export const listFolioHandler: RequestHandler = () => {
  listFolio();
};
