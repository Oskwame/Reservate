import type { HousekeepingTask } from "../types/housekeeping";
import { sampleTasks } from "./sample-tasks";

export function listHousekeepingTasks(): HousekeepingTask[] {
  return sampleTasks;
}

export function countOpenTasks(tasks: HousekeepingTask[]): number {
  return tasks.filter((task) => task.status !== "Completed").length;
}
