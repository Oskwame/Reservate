import type { Room } from "@htms/types";
import { roomStore } from "../../../database";

export interface RoomRepository {
  all(): Room[];
  findById(id: string): Room | undefined;
  save(room: Room): Room;
  update(id: string, updater: (room: Room) => Room): Room | undefined;
  remove(id: string): boolean;
}

export const roomRepository: RoomRepository = {
  all: () => roomStore.all(),
  findById: (id) => roomStore.findById(id),
  save: (room) => roomStore.insert(room),
  update: (id, updater) => roomStore.update(id, updater),
  remove: (id) => roomStore.remove(id),
};
