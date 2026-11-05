import { APP_NAME } from "@htms/config";
import Link from "next/link";
import type { ReactNode } from "react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { SystemStatus } from "@/components/system-status";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="sidebar-brand" href="/dashboard">
          <span className="brand-mark" aria-hidden="true">
            H
          </span>
          <span>
            <strong>{APP_NAME}</strong>
            <small>Operations</small>
          </span>
        </Link>

        <SidebarNav />

        <div className="sidebar-footer">
          <SystemStatus />
          <Link className="side-link" href="/login">
            Sign out
          </Link>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div>
            <p className="eyebrow">Front desk</p>
            <p className="topbar-title">Daily operations</p>
          </div>
          <Link className="button button-small" href="/reservations">
            New reservation
          </Link>
        </header>

        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}
