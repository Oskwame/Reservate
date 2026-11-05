import { formatCurrency } from "@htms/shared";
import { Badge } from "@/components/ui/badge";
import type { MenuItem } from "../types/pos";

export function MenuList({ items }: Readonly<{ items: MenuItem[] }>) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Menu</h2>
        <Badge tone="info">Dinner service</Badge>
      </div>
      <ul className="list">
        {items.map((item) => (
          <li className="list-item" key={item.name}>
            <div>
              <p className="list-title">{item.name}</p>
              <p className="list-meta">{item.category}</p>
            </div>
            <span className="list-amount">{formatCurrency(item.price, "USD")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
