import { Badge } from "@/components/ui/badge";
import type { ReportSummary } from "../types/report";

export function ReportGrid({ reports }: Readonly<{ reports: ReportSummary[] }>) {
  return (
    <div className="report-grid">
      {reports.map((report) => (
        <article className="report-card" key={report.title}>
          <div className="report-card-header">
            <h2>{report.title}</h2>
            <Badge tone={report.tone}>{report.metric}</Badge>
          </div>
          <p>{report.description}</p>
          <button className="button button-secondary button-small" type="button">
            Run report
          </button>
        </article>
      ))}
    </div>
  );
}
