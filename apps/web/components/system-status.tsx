"use client";

import { useApiHealth } from "@/hooks/use-api-health";
import type { ApiHealth } from "@/hooks/use-api-health";

const labels: Record<ApiHealth, string> = {
  checking: "Checking API",
  online: "API online",
  offline: "API offline",
};

export function SystemStatus() {
  const status = useApiHealth();

  return <span className={`status status-${status}`}>{labels[status]}</span>;
}
