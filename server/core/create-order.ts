import { db } from "../db";
import { randomUUID } from "node:crypto";
import { findTableByToken } from "../repositories/restaurant-table.repository";
import { findMenuByRestaurantId } from "../repositories/menu.repository";
import { insertOrder } from "../repositories/order.repository";
import { insertOrderItem } from "../repositories/order-item.repository";
import type { CreateOrderDTO } from "../dtos/create-order.dto";
import { NotFoundError } from "../errors/not-found.error";

export function createOrder(input: CreateOrderDTO) {
  const { tableToken, comment, items } = input;

  const table = findTableByToken(tableToken);

  if (!table) {
    throw new NotFoundError("Table not found");
  }

  const menuItems = findMenuByRestaurantId(table.restaurantId);
  const menuMap = new Map(menuItems.map((m) => [m.id, m]));

  const orderId = randomUUID();

  const createOrderTx = db.transaction(() => {
    let orderTotalPrice = 0;

    for (const item of items) {
      const menuItem = menuMap.get(item.menuItemId);

      if (!menuItem) {
        throw new NotFoundError(`Menu item not found: ${item.menuItemId}`);
      }

      orderTotalPrice += menuItem.price * item.quantity;
    }

    insertOrder({
      id: orderId,
      restaurantId: table.restaurantId,
      tableId: table.id,
      comment: comment ?? null,
      totalPrice: orderTotalPrice,
    });

    for (const item of items) {
      const menuItem = menuMap.get(item.menuItemId)!;

      insertOrderItem({
        id: randomUUID(),
        orderId,
        menuItemId: menuItem.id,
        nameSnapshot: menuItem.name,
        unitPriceSnapshot: menuItem.price,
        quantity: item.quantity,
        totalPrice: menuItem.price * item.quantity,
      });
    }
  });

  createOrderTx();

  return { orderId };
}
