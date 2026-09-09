globalThis.__timing__.logStart('Load chunks/routes/api/index.post');import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import { z, ZodError } from 'zod';
import { randomUUID } from 'node:crypto';
import { N as NotFoundError, d as db } from '../../_/NotFoundError.mjs';
import { f as findTableByToken, a as findMenuByRestaurantId } from '../../_/MenuRepository.mjs';
import { s as saveOrder, a as saveOrderItem } from '../../_/OrderItemRepository.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'mysql2/promise';

function buildMenuMap(menuItems) {
  return new Map(menuItems.map((menuItem) => [menuItem.id, menuItem]));
}
function prepareOrderItems(items, menuMap) {
  const preparedItems = [];
  let totalKopecks = 0;
  for (const item of items) {
    const menuItem = menuMap.get(item.menuItemId);
    if (!menuItem) {
      throw new NotFoundError(`Menu item not found: ${item.menuItemId}`);
    }
    totalKopecks += menuItem.priceKopecks * item.quantity;
    preparedItems.push({
      menuItemId: menuItem.id,
      nameSnapshot: menuItem.name,
      priceKopecksSnapshot: menuItem.priceKopecks,
      quantity: item.quantity
    });
  }
  return { preparedItems, totalKopecks };
}
async function saveOrderItems(items, orderId, connection) {
  for (const item of items) {
    await saveOrderItem(
      {
        id: randomUUID(),
        orderId,
        menuItemId: item.menuItemId,
        nameSnapshot: item.nameSnapshot,
        priceKopecksSnapshot: item.priceKopecksSnapshot,
        quantity: item.quantity
      },
      connection
    );
  }
}
async function createOrder(input) {
  const { tableToken, comment, items } = input;
  const table = await findTableByToken(tableToken);
  if (!table) {
    throw new NotFoundError("Table not found");
  }
  const menuItems = await findMenuByRestaurantId(table.restaurantId);
  const menuMap = buildMenuMap(menuItems);
  const { preparedItems, totalKopecks } = prepareOrderItems(items, menuMap);
  const orderId = randomUUID();
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await saveOrder(
      {
        id: orderId,
        restaurantId: table.restaurantId,
        tableId: table.id,
        comment: comment != null ? comment : null,
        totalKopecks
      },
      connection
    );
    await saveOrderItems(preparedItems, orderId, connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

const orderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().int().min(1)
});
const createOrderSchema = z.object({
  tableToken: z.string(),
  comment: z.string().nullable().optional(),
  items: z.array(orderItemSchema).min(1)
});

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const input = createOrderSchema.parse(body);
    return await createOrder(input);
  } catch (error) {
    console.error("Create order error:", error);
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request",
        data: error.flatten()
      });
    }
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

export { index_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/index.post');
//# sourceMappingURL=index.post.mjs.map
