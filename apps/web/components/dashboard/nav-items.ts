export interface DashboardNavItem {
  href: string;
  label: string;
}

export const dashboardNav: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/reservations", label: "Reservations" },
  { href: "/rooms", label: "Rooms" },
  { href: "/guests", label: "Guests" },
  { href: "/housekeeping", label: "Housekeeping" },
  { href: "/pos", label: "Point of sale" },
  { href: "/inventory", label: "Inventory" },
  { href: "/accounting", label: "Accounting" },
  { href: "/reports", label: "Reports" },
];
