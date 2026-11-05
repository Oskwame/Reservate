import { PageHeading } from "@/components/page-heading";
import { RoomGrid, countAvailableRooms, listRooms } from "@/features/rooms";

export default function RoomsPage() {
  const rooms = listRooms();
  const available = countAvailableRooms(rooms);

  return (
    <div>
      <PageHeading
        eyebrow="Rooms"
        title="Room inventory"
        description="Review availability, capacity, rates, and housekeeping status."
        badge={{ label: `${available} available`, tone: "success" }}
      />

      <RoomGrid rooms={rooms} />
    </div>
  );
}
