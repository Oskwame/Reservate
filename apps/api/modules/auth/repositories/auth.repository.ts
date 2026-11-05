import type { AuthId, AuthSummary } from "../types/auth.types";

export interface AuthRepository {
  findAll(): Promise<AuthSummary[]>;
  findById(id: AuthId): Promise<AuthSummary | undefined>;
}
