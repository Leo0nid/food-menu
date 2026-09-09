import type { OrderItem } from "@entities/OrderItemEntity";

export type OrderItemDbRow = {
  id: string;
  order_id: string;
  menu_item_id: string;
  name_snapshot: string;
  price_kopecks_snapshot: number;
  qty: number;
};

export function mapOrderItemRow(row: OrderItemDbRow): OrderItem {
  return {
    id: row.id,
    orderId: row.order_id,
    menuItemId: row.menu_item_id,
    nameSnapshot: row.name_snapshot,
    priceKopecksSnapshot: row.price_kopecks_snapshot,
    quantity: row.qty,
  };
}
