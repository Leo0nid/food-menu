import { db } from "../../../db";
import { randomUUID } from "node:crypto";
import { findTableByToken } from "../../../repositories/RestaurantTableRepository";
import { findMenuByRestaurantId } from "../../../repositories/MenuRepository";
import { insertOrder } from "../../../repositories/OrderRepository";
import { insertOrderItem } from "../../../repositories/OrderItemRepository";
import type { CreateOrderDTO } from "./dto/CreateOrderDto";
import { NotFoundError } from "../../errors/NotFoundError";

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
