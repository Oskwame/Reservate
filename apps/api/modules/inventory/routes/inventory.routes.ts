import { Router } from "express";
import { listInventoryHandler } from "../controllers/inventory.controller";

export const inventoryRouter = Router();

inventoryRouter.get("/", listInventoryHandler);
