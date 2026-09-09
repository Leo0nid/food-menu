globalThis.__timing__.logStart('Load chunks/routes/api/orders/_id_.get');import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { f as findOrderById, g as getOrderItemsByOrderId } from '../../../_/OrderItemRepository.mjs';
import { N as NotFoundError } from '../../../_/NotFoundError.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mysql2/promise';

async function getOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  const items = await getOrderItemsByOrderId(orderId);
  return { order, items };
}

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }
  try {
    return await getOrder(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw createError({
        statusCode: 404,
        statusMessage: error.message
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { _id__get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/orders/_id_.get');
//# sourceMappingURL=_id_.get.mjs.map
