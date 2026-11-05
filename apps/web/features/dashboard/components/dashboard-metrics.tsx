import type { DashboardMetric } from "../types/dashboard";

export function DashboardMetrics({ metrics }: Readonly<{ metrics: DashboardMetric[] }>) {
  return (
    <section className="metric-grid" aria-label="Daily metrics">
      {metrics.map((metric) => (
        <article className="metric" key={metric.label}>
          <p className="metric-label">{metric.label}</p>
          <p className="metric-value">{metric.value}</p>
          <p className="metric-hint">{metric.hint}</p>
        </article>
      ))}
    </section>
  );
}
