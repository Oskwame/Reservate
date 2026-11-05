import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { ReservationTable, listReservations } from "@/features/reservations";
import { listRooms } from "@/features/rooms";

export default function ReservationsPage() {
  const reservations = listReservations();
  const rooms = listRooms();

  return (
    <div>
      <PageHeading
        eyebrow="Reservations"
        title="Booking ledger"
        description="Track upcoming stays, confirmations, and in-house guests."
        badge={{ label: `${reservations.length} bookings`, tone: "info" }}
        action={
          <Link className="button" href="/reservations">
            New reservation
          </Link>
        }
      />

      <section className="panel table-panel">
        <div className="panel-header">
          <h2>All reservations</h2>
          <Badge tone="neutral">Sample data</Badge>
        </div>
        <ReservationTable reservations={reservations} rooms={rooms} />
      </section>
    </div>
  );
}
