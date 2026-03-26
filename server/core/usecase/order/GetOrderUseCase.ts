import { findOrderById } from "../../../repositories/OrderRepository";
import { findOrderItemsByOrderId } from "../../../repositories/OrderItemRepository";
import { NotFoundError } from "../../errors/NotFoundError";

export function getOrder(orderId: string) {
  const order = findOrderById(orderId);

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  const items = findOrderItemsByOrderId(orderId);

  return { order, items };
}
