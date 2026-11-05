import { PageHeading } from "@/components/page-heading";
import { ReportGrid, listReports } from "@/features/reports";

export default function ReportsPage() {
  const reports = listReports();

  return (
    <div>
      <PageHeading
        eyebrow="Reports"
        title="Operational reporting"
        description="Generate recurring reports for operations, finance, and ownership."
        badge={{ label: `${reports.length} reports`, tone: "neutral" }}
      />

      <ReportGrid reports={reports} />
    </div>
  );
}
