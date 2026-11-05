import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const toneClass: Record<BadgeTone, string> = {
  neutral: "badge-neutral",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info",
};

export function Badge({
  children,
  tone = "neutral",
}: Readonly<{ children: ReactNode; tone?: BadgeTone }>) {
  return <span className={`badge ${toneClass[tone]}`}>{children}</span>;
}
