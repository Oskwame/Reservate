import type { Room } from "@htms/types";
import { sampleRooms } from "./sample-rooms";

export function listRooms(): Room[] {
  return sampleRooms;
}

export function countAvailableRooms(rooms: Room[]): number {
  return rooms.filter((room) => room.status === "available").length;
}

export function indexRoomsById(rooms: Room[]): Map<string, Room> {
  return new Map(rooms.map((room) => [room.id, room] as const));
}
