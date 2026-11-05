export type HousekeepingPriority = "high" | "medium" | "low";

export interface HousekeepingTask {
  room: string;
  task: string;
  assignee: string;
  priority: HousekeepingPriority;
  status: string;
}
