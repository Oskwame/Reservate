import { Router } from "express";
import { listNotificationHandler } from "../controllers/notification.controller";

export const notificationsRouter = Router();

notificationsRouter.get("/", listNotificationHandler);
