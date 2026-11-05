import { randomUUID } from "node:crypto";
import { paginate } from "@htms/shared";
import type { Paginated, Room } from "@htms/types";
import { roomRepository } from "../repositories/room.repository";
import type { CreateRoomCommand, RoomListQuery, UpdateRoomCommand } from "../types/room.types";
import { AppError } from "../../../utils/errors";

function timestamp(): string {
  return new Date().toISOString();
}

export function listRooms(query: RoomListQuery): Paginated<Room> {
  const rooms = roomRepository.all().filter((room) => {
    const matchesStatus = !query.status || room.status === query.status;
    const matchesType = !query.type || room.type === query.type;
    return matchesStatus && matchesType;
  });

  rooms.sort((left, right) => left.number.localeCompare(right.number));

  return paginate(rooms, query.page, query.pageSize);
}

export function getRoom(id: string): Room {
  const room = roomRepository.findById(id);

  if (!room) {
    throw AppError.notFound(`Room ${id} was not found`, "ROOM_NOT_FOUND");
  }

  return room;
}

export function createRoom(input: CreateRoomCommand): Room {
  const now = timestamp();
  const room: Room = {
    id: randomUUID(),
    status: "available",
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  return roomRepository.save(room);
}

export function updateRoom(id: string, input: UpdateRoomCommand): Room {
  const updated = roomRepository.update(id, (room) => ({
    ...room,
    ...input,
    updatedAt: timestamp(),
  }));

  if (!updated) {
    throw AppError.notFound(`Room ${id} was not found`, "ROOM_NOT_FOUND");
  }

  return updated;
}

export function deleteRoom(id: string): void {
  if (!roomRepository.remove(id)) {
    throw AppError.notFound(`Room ${id} was not found`, "ROOM_NOT_FOUND");
  }
}
