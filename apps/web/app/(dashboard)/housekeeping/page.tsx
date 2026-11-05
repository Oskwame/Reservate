import { PageHeading } from "@/components/page-heading";
import { TaskCard, countOpenTasks, listHousekeepingTasks } from "@/features/housekeeping";

export default function HousekeepingPage() {
  const tasks = listHousekeepingTasks();
  const openTasks = countOpenTasks(tasks);

  return (
    <div>
      <PageHeading
        eyebrow="Housekeeping"
        title="Cleaning and maintenance queue"
        description="Assign work, track room readiness, and resolve maintenance blockers."
        badge={{ label: `${openTasks} open tasks`, tone: "warning" }}
      />

      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard key={`${task.room}-${task.task}`} task={task} />
        ))}
      </div>
    </div>
  );
}
