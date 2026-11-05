"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "./nav-items";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="side-nav" aria-label="Dashboard">
      {dashboardNav.map((item) => {
        const active =
          item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`side-link${active ? " side-link-active" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
