import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import { needsReorder } from "../services/inventory-service";
import type { InventoryItem } from "../types/inventory";

function stockTone(item: InventoryItem): BadgeTone {
  return needsReorder(item) ? "warning" : "success";
}

export function InventoryTable({ items }: Readonly<{ items: InventoryItem[] }>) {
  return (
    <div className="table-scroll">
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th className="align-right">On hand</th>
            <th className="align-right">Reorder at</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td className="table-primary">{item.name}</td>
              <td>{item.category}</td>
              <td className="align-right">
                {item.onHand} {item.unit}
              </td>
              <td className="align-right">
                {item.reorderLevel} {item.unit}
              </td>
              <td>
                <Badge tone={stockTone(item)}>{needsReorder(item) ? "Reorder" : "In stock"}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
