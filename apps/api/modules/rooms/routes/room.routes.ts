import { Router } from "express";
import {
  createRoomHandler,
  deleteRoomHandler,
  getRoomHandler,
  listRoomsHandler,
  updateRoomHandler,
} from "../controllers/room.controller";

export const roomsRouter = Router();

roomsRouter.get("/", listRoomsHandler);
roomsRouter.get("/:id", getRoomHandler);
roomsRouter.post("/", createRoomHandler);
roomsRouter.patch("/:id", updateRoomHandler);
roomsRouter.delete("/:id", deleteRoomHandler);
