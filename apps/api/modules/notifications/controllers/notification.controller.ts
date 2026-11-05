import type { RequestHandler } from "express";
import { listNotification } from "../services/notification.service";

export const listNotificationHandler: RequestHandler = () => {
  listNotification();
};
