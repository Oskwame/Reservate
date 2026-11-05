import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import {
  AccountingMetrics,
  LedgerTable,
  listAccountingMetrics,
  listLedgerEntries,
} from "@/features/accounting";

export default function AccountingPage() {
  const metrics = listAccountingMetrics();
  const entries = listLedgerEntries();

  return (
    <div>
      <PageHeading
        eyebrow="Accounting"
        title="Financial summary"
        description="Revenue, settlements, and expenses for the current period."
        badge={{ label: "November 2026", tone: "info" }}
      />

      <AccountingMetrics metrics={metrics} />

      <section className="panel table-panel">
        <div className="panel-header">
          <h2>Recent ledger</h2>
          <Badge tone="neutral">Last {entries.length} entries</Badge>
        </div>
        <LedgerTable entries={entries} />
      </section>
    </div>
  );
}
