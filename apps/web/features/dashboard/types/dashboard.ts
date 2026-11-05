import type { Reservation, Room } from "@htms/types";

export interface DashboardMetric {
  label: string;
  value: string;
  hint: string;
}

export interface DashboardSummary {
  metrics: DashboardMetric[];
  rooms: Room[];
  arrivals: Reservation[];
  occupancy: number;
}
