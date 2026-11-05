import type { HousekeepingTask } from "../types/housekeeping";

export const sampleTasks: HousekeepingTask[] = [
  {
    room: "305",
    task: "Deep clean corner suite",
    assignee: "Rosa M.",
    priority: "high",
    status: "In progress",
  },
  {
    room: "108",
    task: "Repair shower valve",
    assignee: "Luis P.",
    priority: "high",
    status: "Blocked",
  },
  {
    room: "204",
    task: "Turndown service",
    assignee: "Amara K.",
    priority: "low",
    status: "Pending",
  },
  {
    room: "101",
    task: "Inspect room after checkout",
    assignee: "Rosa M.",
    priority: "medium",
    status: "Pending",
  },
  {
    room: "Lobby",
    task: "Restock minibar and amenities",
    assignee: "Noah S.",
    priority: "medium",
    status: "Completed",
  },
];
