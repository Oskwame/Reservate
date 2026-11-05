import type { ReservationStatus } from "@htms/types";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";

export const reservationTone: Record<ReservationStatus, BadgeTone> = {
  pending: "warning",
  confirmed: "info",
  checked_in: "success",
  checked_out: "neutral",
  cancelled: "danger",
  no_show: "danger",
};

export function formatReservationStatus(status: ReservationStatus): string {
  return status.replaceAll("_", " ");
}

export function ReservationStatusBadge({ status }: Readonly<{ status: ReservationStatus }>) {
  return <Badge tone={reservationTone[status]}>{formatReservationStatus(status)}</Badge>;
}
