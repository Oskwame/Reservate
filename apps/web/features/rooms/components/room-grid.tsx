import type { Room } from "@htms/types";
import { RoomCard } from "./room-card";

export function RoomGrid({
  rooms,
  compact = false,
}: Readonly<{ rooms: Room[]; compact?: boolean }>) {
  return (
    <div className={compact ? "room-grid room-grid-compact" : "room-grid"}>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
