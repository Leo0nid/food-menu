import { randomUUID } from "node:crypto";
import { db } from "../db";
import { findTableByToken } from "../repositories/restaurant-table.repository";
import { findMenuByRestaurantId } from "../repositories/menu.repository";
import { insertOrder } from "../repositories/order.repository";
import { insertOrderItem } from "../repositories/order-items.repository";

type CreateOrderItemInput = {
  menuItemId: string;
  quantity: number;
};

type CreateOrderInput = {
  tableToken: string;
  comment?: string | null;
  items: CreateOrderItemInput[];
};

export function createOrder(input: CreateOrderInput) {
  const { tableToken, comment, items } = input;

  if (!items.length) {
    throw new Error("Order items are required");
  }

  const table = findTableByToken(tableToken);

  if (!table) {
    throw new Error("Table not found");
  }

  const menuItems = findMenuByRestaurantId(table.restaurantId);
  const menuMap = new Map(menuItems.map((menuItem) => [menuItem.id, menuItem]));

  const orderId = randomUUID();

  const createOrderTx = db.transaction(() => {
    insertOrder({
      id: orderId,
      restaurantId: table.restaurantId,
      tableId: table.id,
      comment: comment ?? null,
    });

    for (const item of items) {
      const menuItem = menuMap.get(item.menuItemId);

      if (!menuItem) {
        throw new Error(`Menu item not found: ${item.menuItemId}`);
      }

      if (item.quantity < 1) {
        throw new Error(`Invalid quantity: ${item.quantity}`);
      }

      insertOrderItem({
        id: randomUUID(),
        orderId,
        menuItemId: menuItem.id,
        nameSnapshot: menuItem.name,
        priceCentsSnapshot: menuItem.priceCents,
        quantity: item.quantity,
      });
    }
  });

  createOrderTx();

  return { orderId };
}
