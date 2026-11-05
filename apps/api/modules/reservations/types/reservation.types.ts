export type {
  CreateReservationInput as CreateReservationCommand,
  ReservationQuery as ReservationListQuery,
  UpdateReservationStatusInput as UpdateReservationStatusCommand,
} from "@htms/validation";

export interface StayDateRange {
  checkIn: string;
  checkOut: string;
}
