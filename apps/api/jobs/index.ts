import { dailyReportsJob } from "./daily-reports.job";
import { expiredReservationsJob } from "./expired-reservations.job";
import { housekeepingUpdatesJob } from "./housekeeping-updates.job";
import { paymentReconciliationJob } from "./payment-reconciliation.job";
import { registerJob } from "./registry";
import { reservationRemindersJob } from "./reservation-reminders.job";

export { getJob, listJobs, registerJob, runJob } from "./registry";
export type { JobDefinition, JobSummary } from "./types";

registerJob(reservationRemindersJob);
registerJob(paymentReconciliationJob);
registerJob(housekeepingUpdatesJob);
registerJob(dailyReportsJob);
registerJob(expiredReservationsJob);
