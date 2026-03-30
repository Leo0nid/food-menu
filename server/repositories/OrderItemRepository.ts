import { db } from "../db";
import type { OrderItem } from "../entities/OrderItemEntity";
import { mapOrderItemRow } from "../mappers/OrderItemMapper";
import type { OrderItemRow } from "../mappers/OrderItemMapper";

type InsertOrderItemParams = {
  id: string;
  orderId: string;
  menuItemId: string;
  nameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
};

export function insertOrderItem(params: InsertOrderItemParams) {
  return db
    .prepare(
      `
      INSERT INTO order_items (
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_cents_snapshot,
        qty
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    )
    .run(
      params.id,
      params.orderId,
      params.menuItemId,
      params.nameSnapshot,
      params.unitPriceSnapshot,
      params.quantity,
    );
}

export function findOrderItemsByOrderId(orderId: string): OrderItem[] {
  const rows = db
    .prepare(
      `
      SELECT
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_cents_snapshot,
        qty
      FROM order_items
      WHERE order_id = ?
    `,
    )
    .all(orderId) as OrderItemRow[];

  return rows.map(mapOrderItemRow);
}

export function findOrderItemsByOrderIds(orderIds: string[]): OrderItem[] {
  if (orderIds.length === 0) return [];

  const placeholders = orderIds.map(() => "?").join(", ");

  const rows = db
    .prepare(
      `
      SELECT
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_cents_snapshot,
        qty
      FROM order_items
      WHERE order_id IN (${placeholders})
    `,
    )
    .all(...orderIds) as OrderItemRow[];

  return rows.map(mapOrderItemRow);
}
