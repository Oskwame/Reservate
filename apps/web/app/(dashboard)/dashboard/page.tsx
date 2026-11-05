import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { ArrivalsPanel, DashboardMetrics, getDashboardSummary } from "@/features/dashboard";
import { RoomGrid } from "@/features/rooms";

export default function DashboardPage() {
  const { metrics, rooms, arrivals, occupancy } = getDashboardSummary();

  return (
    <div>
      <PageHeading
        eyebrow="Overview"
        title="Front desk overview"
        description="A live snapshot of inventory, arrivals, and room readiness."
        badge={{ label: `${occupancy}% occupancy`, tone: "warning" }}
        action={
          <Link className="button" href="/reservations">
            New reservation
          </Link>
        }
      />

      <DashboardMetrics metrics={metrics} />

      <section className="two-col">
        <div>
          <div className="section-heading">
            <h2>Room status</h2>
            <Link className="text-link" href="/rooms">
              View all rooms
            </Link>
          </div>
          <RoomGrid rooms={rooms.slice(0, 3)} compact />
        </div>

        <ArrivalsPanel arrivals={arrivals} rooms={rooms} />
      </section>
    </div>
  );
}
