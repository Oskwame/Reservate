import type { UserId, UserSummary } from "../types/user.types";

export interface UserRepository {
  findAll(): Promise<UserSummary[]>;
  findById(id: UserId): Promise<UserSummary | undefined>;
}
