import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import type { HousekeepingPriority, HousekeepingTask } from "../types/housekeeping";

const priorityTone: Record<HousekeepingPriority, BadgeTone> = {
  high: "danger",
  medium: "warning",
  low: "info",
};

export function TaskCard({ task }: Readonly<{ task: HousekeepingTask }>) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <span className="task-room">{task.room}</span>
        <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
      </div>
      <h2>{task.task}</h2>
      <p className="task-meta">Assigned to {task.assignee}</p>
      <div className="task-footer">
        <span className="task-status">{task.status}</span>
      </div>
    </article>
  );
}
