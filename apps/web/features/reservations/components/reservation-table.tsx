import { formatCurrency, formatDate } from "@htms/shared";
import type { Reservation, Room } from "@htms/types";
import { ReservationStatusBadge } from "./reservation-status-badge";

export function ReservationTable({
  reservations,
  rooms,
}: Readonly<{ reservations: Reservation[]; rooms: Room[] }>) {
  const roomsById = new Map(rooms.map((room) => [room.id, room] as const));

  return (
    <div className="table-scroll">
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Guest</th>
            <th>Room</th>
            <th>Stay</th>
            <th>Status</th>
            <th className="align-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const room = roomsById.get(reservation.roomId);

            return (
              <tr key={reservation.id}>
                <td className="mono">{reservation.code}</td>
                <td>
                  <span className="table-primary">
                    {reservation.guest.firstName} {reservation.guest.lastName}
                  </span>
                  <span className="table-secondary">{reservation.guest.email}</span>
                </td>
                <td>{room?.number ?? "—"}</td>
                <td>
                  {formatDate(reservation.checkIn)} → {formatDate(reservation.checkOut)}
                </td>
                <td>
                  <ReservationStatusBadge status={reservation.status} />
                </td>
                <td className="align-right">
                  {formatCurrency(reservation.totalAmount, reservation.currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
