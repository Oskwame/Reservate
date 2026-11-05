import { countReservationsByStatus, listReservations } from "@/features/reservations";
import { countAvailableRooms, listRooms } from "@/features/rooms";
import type { DashboardMetric, DashboardSummary } from "../types/dashboard";

export function getDashboardSummary(): DashboardSummary {
  const rooms = listRooms();
  const reservations = listReservations();
  const availableRooms = countAvailableRooms(rooms);
  const inHouse = countReservationsByStatus(reservations, "checked_in");
  const arrivals = reservations.filter((reservation) => reservation.status === "confirmed");
  const departures = countReservationsByStatus(reservations, "checked_out");
  const occupancy =
    rooms.length === 0 ? 0 : Math.round(((rooms.length - availableRooms) / rooms.length) * 100);

  const metrics: DashboardMetric[] = [
    {
      label: "Available rooms",
      value: String(availableRooms),
      hint: `of ${rooms.length} tracked`,
    },
    {
      label: "In-house stays",
      value: String(inHouse),
      hint: "currently checked in",
    },
    {
      label: "Arrivals",
      value: String(arrivals.length),
      hint: "confirmed for today",
    },
    {
      label: "Departures",
      value: String(departures),
      hint: "completed today",
    },
  ];

  return { metrics, rooms, arrivals, occupancy };
}
