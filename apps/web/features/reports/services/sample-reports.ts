import type { ReportSummary } from "../types/report";

export const sampleReports: ReportSummary[] = [
  {
    title: "Occupancy",
    description: "Rooms sold against available room nights for the selected period.",
    metric: "72%",
    tone: "info",
  },
  {
    title: "ADR and RevPAR",
    description: "Average daily rate and revenue per available room trends.",
    metric: "$214",
    tone: "success",
  },
  {
    title: "Revenue by department",
    description: "Rooms, food and beverage, and ancillary revenue split.",
    metric: "$128.4k",
    tone: "warning",
  },
  {
    title: "Housekeeping performance",
    description: "Rooms cleaned, turnaround time, and maintenance blockers.",
    metric: "96%",
    tone: "success",
  },
  {
    title: "Guest ledger aging",
    description: "Outstanding city ledger balances grouped by age.",
    metric: "$14.3k",
    tone: "danger",
  },
  {
    title: "Arrivals and departures",
    description: "Daily movement of guests and expected occupancy.",
    metric: "23 today",
    tone: "info",
  },
];
