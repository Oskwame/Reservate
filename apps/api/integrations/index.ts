export type * from "./email";
export type * from "./sms";
export type * from "./payments";
export type * from "./storage";
export type * from "./external-apis";

export interface Integration {
  name: string;
  enabled: boolean;
  healthCheck: () => Promise<boolean>;
}

const registry = new Map<string, Integration>();

export function registerIntegration(integration: Integration): void {
  registry.set(integration.name, integration);
}

export function getIntegration(name: string): Integration | undefined {
  return registry.get(name);
}

export function listIntegrations(): Integration[] {
  return Array.from(registry.values());
}
