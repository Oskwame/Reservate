import type { RequestHandler } from "express";
import { listPayment } from "../services/payment.service";

export const listPaymentHandler: RequestHandler = () => {
  listPayment();
};
