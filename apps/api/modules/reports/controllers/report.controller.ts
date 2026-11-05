import type { RequestHandler } from "express";
import { listReport } from "../services/report.service";

export const listReportHandler: RequestHandler = () => {
  listReport();
};
