export type ExternalApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ExternalApiRequest {
  path: string;
  method?: ExternalApiMethod;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface ExternalApiClient {
  name: string;
  request<T>(input: ExternalApiRequest): Promise<T>;
  healthCheck(): Promise<boolean>;
}
