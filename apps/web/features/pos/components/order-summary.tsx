import { formatCurrency } from "@htms/shared";
import { Badge } from "@/components/ui/badge";
import type { OrderLine } from "../types/pos";

export function OrderSummary({ lines, total }: Readonly<{ lines: OrderLine[]; total: number }>) {
  return (
    <aside className="panel">
      <div className="panel-header">
        <h2>Current order</h2>
        <Badge tone="warning">Table 12</Badge>
      </div>
      <ul className="list">
        {lines.map((line) => (
          <li className="list-item" key={line.name}>
            <div>
              <p className="list-title">
                {line.quantity} × {line.name}
              </p>
            </div>
            <span className="list-amount">{formatCurrency(line.price * line.quantity, "USD")}</span>
          </li>
        ))}
      </ul>
      <div className="order-total">
        <span>Total</span>
        <strong>{formatCurrency(total, "USD")}</strong>
      </div>
      <button className="button button-block" type="button">
        Charge to room
      </button>
    </aside>
  );
}
