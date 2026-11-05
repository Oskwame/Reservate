import type { ISODateString, UUID } from "./common";

export const USER_ROLES = ["admin", "manager", "receptionist", "housekeeping"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: UUID;
  email: string;
  name: string;
  role: UserRole;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
