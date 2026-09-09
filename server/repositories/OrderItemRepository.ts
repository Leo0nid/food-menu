import { db, executeQuery, type DbConnection } from "@database/index";
import type { OrderItem } from "@entities/OrderItemEntity";
import { mapOrderItemRow } from "@mappers/OrderItemMapper";
import type { OrderItemDbRow } from "@mappers/OrderItemMapper";

type InsertOrderItemParams = {
  id: string;
  orderId: string;
  menuItemId: string;
  nameSnapshot: string;
  priceKopecksSnapshot: number;
  quantity: number;
};

export async function saveOrderItem(
  params: InsertOrderItemParams,
  connection?: DbConnection,
): Promise<void> {
  const executor = connection ?? db;
  await executor.execute(
    `
      INSERT INTO order_items (
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_kopecks_snapshot,
        qty
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      params.id,
      params.orderId,
      params.menuItemId,
      params.nameSnapshot,
      params.priceKopecksSnapshot,
      params.quantity,
    ],
  );
}

export async function getOrderItemsByOrderId(
  orderId: string,
): Promise<OrderItem[]> {
  const rows = await executeQuery<OrderItemDbRow>(
    `
      SELECT
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_kopecks_snapshot,
        qty
      FROM order_items
      WHERE order_id = ?
    `,
    [orderId],
  );

  return rows.map(mapOrderItemRow);
}

export async function getOrderItemsByOrderIds(
  orderIds: string[],
): Promise<OrderItem[]> {
  if (orderIds.length === 0) return [];

  const placeholders = orderIds.map(() => "?").join(", ");
  const rows = await executeQuery<OrderItemDbRow>(
    `
      SELECT
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_kopecks_snapshot,
        qty
      FROM order_items
      WHERE order_id IN (${placeholders})
    `,
    orderIds,
  );

  return rows.map(mapOrderItemRow);
}
