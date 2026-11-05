import type { InventoryItem } from "../types/inventory";

export const sampleInventory: InventoryItem[] = [
  { name: "Bath towels", category: "Linen", unit: "pcs", onHand: 240, reorderLevel: 120 },
  { name: "Bed sheets", category: "Linen", unit: "sets", onHand: 96, reorderLevel: 80 },
  {
    name: "Shampoo bottles",
    category: "Amenities",
    unit: "pcs",
    onHand: 58,
    reorderLevel: 75,
  },
  { name: "Coffee pods", category: "F&B", unit: "pcs", onHand: 420, reorderLevel: 200 },
  {
    name: "Toilet paper",
    category: "Amenities",
    unit: "rolls",
    onHand: 140,
    reorderLevel: 160,
  },
  {
    name: "Glass cleaner",
    category: "Cleaning",
    unit: "bottles",
    onHand: 24,
    reorderLevel: 12,
  },
];
