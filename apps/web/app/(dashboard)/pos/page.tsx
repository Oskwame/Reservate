import { PageHeading } from "@/components/page-heading";
import { MenuList, OrderSummary, getPosSnapshot } from "@/features/pos";

export default function PosPage() {
  const { menu, order, total } = getPosSnapshot();

  return (
    <div>
      <PageHeading
        eyebrow="Point of sale"
        title="Restaurant and bar"
        description="Post charges to guest folios from the kitchen and bar."
        badge={{ label: "Table 12", tone: "warning" }}
      />

      <section className="two-col">
        <MenuList items={menu} />
        <OrderSummary lines={order} total={total} />
      </section>
    </div>
  );
}
