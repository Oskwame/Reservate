export interface InventoryItem {
  name: string;
  category: string;
  unit: string;
  onHand: number;
  reorderLevel: number;
}
