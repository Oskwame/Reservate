import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { GuestTable, listGuests } from "@/features/guests";

export default function GuestsPage() {
  const guests = listGuests();

  return (
    <div>
      <PageHeading
        eyebrow="Guests"
        title="Guest directory"
        description="Profiles captured from reservations and front desk activity."
        badge={{ label: `${guests.length} guests`, tone: "neutral" }}
      />

      <section className="panel table-panel">
        <div className="panel-header">
          <h2>Guest profiles</h2>
          <Badge tone="neutral">Sample data</Badge>
        </div>
        <GuestTable guests={guests} />
      </section>
    </div>
  );
}
