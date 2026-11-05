export interface MenuItem {
  name: string;
  category: string;
  price: number;
}

export interface OrderLine {
  name: string;
  quantity: number;
  price: number;
}

export interface PosSnapshot {
  menu: MenuItem[];
  order: OrderLine[];
  total: number;
}
