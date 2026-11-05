export interface JobDefinition {
  name: string;
  description: string;
  schedule: string;
  enabled: boolean;
  run: () => Promise<void>;
}

export interface JobSummary {
  name: string;
  description: string;
  schedule: string;
  enabled: boolean;
}
