import type { Reservation, Room } from "@htms/types";
import { databaseConfig } from "../config/database";
import { createMemoryStore } from "./memory-store";
import { seedReservations, seedRooms } from "./seed";

export interface DatabaseStatus {
  driver: "memory";
  status: "up";
}

export const roomStore = createMemoryStore<Room>(seedRooms);

export const reservationStore = createMemoryStore<Reservation>(seedReservations);

export const database = {
  async health(): Promise<DatabaseStatus> {
    return { driver: databaseConfig.driver, status: "up" };
  },
};
