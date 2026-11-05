import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  badge?: {
    label: string;
    tone: BadgeTone;
  };
  action?: ReactNode;
}

export function PageHeading({
  eyebrow,
  title,
  description,
  badge,
  action,
}: Readonly<PageHeadingProps>) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <div className="heading-row">
          <h1>{title}</h1>
          {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
        </div>
        {description ? <p className="page-description">{description}</p> : null}
      </div>
      {action ? <div className="page-action">{action}</div> : null}
    </div>
  );
}
