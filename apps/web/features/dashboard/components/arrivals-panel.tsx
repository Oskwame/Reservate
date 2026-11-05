import { calculateNights, formatCurrency, formatDate } from "@htms/shared";
import type { Reservation, Room } from "@htms/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ArrivalsPanel({
  arrivals,
  rooms,
}: Readonly<{ arrivals: Reservation[]; rooms: Room[] }>) {
  const roomsById = new Map(rooms.map((room) => [room.id, room] as const));

  return (
    <aside className="panel">
      <div className="panel-header">
        <h2>Today&apos;s arrivals</h2>
        <Badge tone="info">{arrivals.length}</Badge>
      </div>
      <ul className="list">
        {arrivals.map((reservation) => {
          const room = roomsById.get(reservation.roomId);
          const nights = calculateNights(reservation.checkIn, reservation.checkOut);

          return (
            <li className="list-item" key={reservation.id}>
              <div>
                <p className="list-title">
                  {reservation.guest.firstName} {reservation.guest.lastName}
                </p>
                <p className="list-meta">
                  Room {room?.number ?? "—"} · {formatDate(reservation.checkIn)} · {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
                </p>
              </div>
              <span className="list-amount">
                {formatCurrency(reservation.totalAmount, reservation.currency)}
              </span>
            </li>
          );
        })}
      </ul>
      <Link className="panel-link" href="/reservations">
        Open reservations
      </Link>
    </aside>
  );
}
