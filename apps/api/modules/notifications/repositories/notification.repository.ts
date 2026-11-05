import type { NotificationId, NotificationSummary } from "../types/notification.types";

export interface NotificationRepository {
  findAll(): Promise<NotificationSummary[]>;
  findById(id: NotificationId): Promise<NotificationSummary | undefined>;
}
