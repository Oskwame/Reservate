import type { InventoryItem } from "../types/inventory";
import { sampleInventory } from "./sample-inventory";

export function listInventory(): InventoryItem[] {
  return sampleInventory;
}

export function needsReorder(item: InventoryItem): boolean {
  return item.onHand <= item.reorderLevel;
}

export function countItemsToReorder(items: InventoryItem[]): number {
  return items.filter(needsReorder).length;
}
