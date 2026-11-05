import type { RequestHandler } from "express";
import { listInventory } from "../services/inventory.service";

export const listInventoryHandler: RequestHandler = () => {
  listInventory();
};
