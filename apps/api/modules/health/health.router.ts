import { Router } from "express";
import { database } from "../../database";
import { sendResponse } from "../../utils/response";

export const healthRouter = Router();

healthRouter.get("/", async (_request, response) => {
  const dependency = await database.health();

  sendResponse(response, {
    status: "ok",
    service: "hotel-management-api",
    version: "0.1.0",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    dependencies: {
      database: dependency,
    },
  });
});
