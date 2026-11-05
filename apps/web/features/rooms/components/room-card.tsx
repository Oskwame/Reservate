import { formatCurrency } from "@htms/shared";
import type { Room } from "@htms/types";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";

const statusTone: Record<Room["status"], BadgeTone> = {
  available: "success",
  occupied: "warning",
  cleaning: "info",
  maintenance: "danger",
  out_of_service: "neutral",
};

function formatStatus(status: Room["status"]): string {
  return status.replaceAll("_", " ");
}

export function RoomCard({ room }: Readonly<{ room: Room }>) {
  return (
    <article className="room-card">
      <div className="room-card-header">
        <div>
          <p className="room-number">Room {room.number}</p>
          <h3>{room.name}</h3>
        </div>
        <Badge tone={statusTone[room.status]}>{formatStatus(room.status)}</Badge>
      </div>

      <dl className="room-meta">
        <div>
          <dt>Type</dt>
          <dd>{room.type}</dd>
        </div>
        <div>
          <dt>Floor</dt>
          <dd>{room.floor}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{room.capacity} guests</dd>
        </div>
      </dl>

      <p className="room-rate">
        {formatCurrency(room.nightlyRate, room.currency)}
        <span> / night</span>
      </p>
    </article>
  );
}
