import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { InventoryTable, countItemsToReorder, listInventory } from "@/features/inventory";

export default function InventoryPage() {
  const items = listInventory();
  const reorderCount = countItemsToReorder(items);

  return (
    <div>
      <PageHeading
        eyebrow="Inventory"
        title="Stock and supplies"
        description="Monitor linen, amenities, and consumables against reorder thresholds."
        badge={{
          label: `${reorderCount} to reorder`,
          tone: reorderCount > 0 ? "warning" : "success",
        }}
      />

      <section className="panel table-panel">
        <div className="panel-header">
          <h2>Stock levels</h2>
          <Badge tone="neutral">Main store</Badge>
        </div>
        <InventoryTable items={items} />
      </section>
    </div>
  );
}
