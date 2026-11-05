import type { JobDefinition, JobSummary } from "./types";

const registry = new Map<string, JobDefinition>();

export function registerJob(job: JobDefinition): void {
  if (registry.has(job.name)) {
    throw new Error(`Job ${job.name} is already registered`);
  }

  registry.set(job.name, job);
}

export function getJob(name: string): JobDefinition | undefined {
  return registry.get(name);
}

export function listJobs(): JobSummary[] {
  return Array.from(registry.values(), ({ name, description, schedule, enabled }) => ({
    name,
    description,
    schedule,
    enabled,
  }));
}

export async function runJob(name: string): Promise<void> {
  const job = registry.get(name);

  if (!job) {
    throw new Error(`Job ${name} is not registered`);
  }

  if (!job.enabled) {
    return;
  }

  await job.run();
}
