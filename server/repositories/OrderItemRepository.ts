import { db } from "../db";

type InsertOrderItemParams = {
  id: string;
  orderId: string;
  menuItemId: string;
  nameSnapshot: string;
  unitPriceSnapshot: number;
  totalPrice: number;
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
        quantity
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
