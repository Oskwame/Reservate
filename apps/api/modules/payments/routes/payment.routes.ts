import { Router } from "express";
import { listPaymentHandler } from "../controllers/payment.controller";

export const paymentsRouter = Router();

paymentsRouter.get("/", listPaymentHandler);
