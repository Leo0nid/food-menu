import { findOrderById } from "~repositories/OrderRepository";
import { getOrderItemsByOrderId } from "~repositories/OrderItemRepository";
import { NotFoundError } from "@errors/NotFoundError";

export async function getOrder(orderId: string) {
  const order = await findOrderById(orderId);

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  const items = await getOrderItemsByOrderId(orderId);

  return { order, items };
}
