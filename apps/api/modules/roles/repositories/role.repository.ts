import type { RoleId, RoleSummary } from "../types/role.types";

export interface RoleRepository {
  findAll(): Promise<RoleSummary[]>;
  findById(id: RoleId): Promise<RoleSummary | undefined>;
}
