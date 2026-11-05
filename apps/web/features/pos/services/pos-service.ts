import type { OrderLine, PosSnapshot } from "../types/pos";
import { sampleMenu, sampleOrder } from "./sample-pos";

export function calculateOrderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

export function getPosSnapshot(): PosSnapshot {
  return {
    menu: sampleMenu,
    order: sampleOrder,
    total: calculateOrderTotal(sampleOrder),
  };
}
