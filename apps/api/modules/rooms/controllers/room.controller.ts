import type { RequestHandler } from "express";
import {
  createRoomSchema,
  roomIdParamsSchema,
  roomQuerySchema,
  updateRoomSchema,
} from "../validators/room.validator";
import { createRoom, deleteRoom, getRoom, listRooms, updateRoom } from "../services/room.service";
import { sendCreated, sendNoContent, sendResponse } from "../../../utils/response";

export const listRoomsHandler: RequestHandler = (request, response) => {
  const query = roomQuerySchema.parse(request.query);
  sendResponse(response, listRooms(query));
};

export const getRoomHandler: RequestHandler = (request, response) => {
  const { id } = roomIdParamsSchema.parse(request.params);
  sendResponse(response, getRoom(id));
};

export const createRoomHandler: RequestHandler = (request, response) => {
  const input = createRoomSchema.parse(request.body);
  sendCreated(response, createRoom(input));
};

export const updateRoomHandler: RequestHandler = (request, response) => {
  const { id } = roomIdParamsSchema.parse(request.params);
  const input = updateRoomSchema.parse(request.body);
  sendResponse(response, updateRoom(id, input));
};

export const deleteRoomHandler: RequestHandler = (request, response) => {
  const { id } = roomIdParamsSchema.parse(request.params);
  deleteRoom(id);
  sendNoContent(response);
};
