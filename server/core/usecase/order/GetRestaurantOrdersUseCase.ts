import { findOrdersByRestaurantId } from "~repositories/OrderRepository";
import { getOrderItemsByOrderIds } from "~repositories/OrderItemRepository";
import { ValidationError } from "@errors/ValidationError";

export async function getRestaurantOrders(restaurantId: string) {
  const id = restaurantId.trim();
  if (!id) {
    throw new ValidationError("restaurantId required");
  }

  const orders = await findOrdersByRestaurantId(id);
  const items = await getOrderItemsByOrderIds(orders.map((o) => o.id));

  const itemsByOrderId = new Map<string, typeof items>();
  for (const item of items) {
    const list = itemsByOrderId.get(item.orderId);
    if (list) list.push(item);
    else itemsByOrderId.set(item.orderId, [item]);
  }

  return orders.map((order) => ({
    order,
    items: itemsByOrderId.get(order.id) ?? [],
  }));
}
