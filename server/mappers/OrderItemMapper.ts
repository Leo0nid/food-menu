import type { OrderItem } from "../entities/OrderItemEntity";

type OrderItemRow = {
  id: string;
  order_id: string;
  menu_item_id: string;
  name_snapshot: string;
  price_cents_snapshot: number;
  qty: number;
};

export function mapOrderItemRow(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    orderId: row.order_id,
    menuItemId: row.menu_item_id,
    nameSnapshot: row.name_snapshot,
    unitPriceSnapshot: row.price_cents_snapshot,
    quantity: row.qty,
  };
}

export type { OrderItemRow };
