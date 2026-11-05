import { formatCurrency } from "@htms/shared";
import type { AccountingMetric } from "../types/accounting";

export function AccountingMetrics({ metrics }: Readonly<{ metrics: AccountingMetric[] }>) {
  return (
    <section className="metric-grid" aria-label="Financial metrics">
      {metrics.map((metric) => (
        <article className="metric" key={metric.label}>
          <p className="metric-label">{metric.label}</p>
          <p className="metric-value">{formatCurrency(metric.value, "USD")}</p>
          <p className="metric-hint">{metric.hint}</p>
        </article>
      ))}
    </section>
  );
}
