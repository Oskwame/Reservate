import type { MenuItem, OrderLine } from "../types/pos";

export const sampleMenu: MenuItem[] = [
  { name: "Club sandwich", category: "Kitchen", price: 18 },
  { name: "Caesar salad", category: "Kitchen", price: 16 },
  { name: "Truffle fries", category: "Kitchen", price: 11 },
  { name: "Sparkling water", category: "Bar", price: 6 },
  { name: "Espresso", category: "Bar", price: 4 },
  { name: "House red", category: "Bar", price: 14 },
];

export const sampleOrder: OrderLine[] = [
  { name: "Club sandwich", quantity: 2, price: 18 },
  { name: "Truffle fries", quantity: 1, price: 11 },
  { name: "Sparkling water", quantity: 2, price: 6 },
  { name: "Espresso", quantity: 2, price: 4 },
];
