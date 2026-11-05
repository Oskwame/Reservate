import { formatCurrency, formatDate } from "@htms/shared";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import type { EntryType, LedgerEntry } from "../types/accounting";

const entryTone: Record<EntryType, BadgeTone> = {
  revenue: "success",
  expense: "danger",
  payment: "info",
};

export function LedgerTable({ entries }: Readonly<{ entries: LedgerEntry[] }>) {
  return (
    <div className="table-scroll">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference</th>
            <th>Description</th>
            <th>Type</th>
            <th className="align-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.reference}>
              <td>{formatDate(entry.date)}</td>
              <td className="mono">{entry.reference}</td>
              <td>{entry.description}</td>
              <td>
                <Badge tone={entryTone[entry.type]}>{entry.type}</Badge>
              </td>
              <td className="align-right">{formatCurrency(entry.amount, "USD")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
