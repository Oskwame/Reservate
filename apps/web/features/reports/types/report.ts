import type { BadgeTone } from "@/components/ui/badge";

export interface ReportSummary {
  title: string;
  description: string;
  metric: string;
  tone: BadgeTone;
}
