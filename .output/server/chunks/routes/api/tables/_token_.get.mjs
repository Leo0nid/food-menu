globalThis.__timing__.logStart('Load chunks/routes/api/tables/_token_.get');import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { N as NotFoundError } from '../../../_/NotFoundError.mjs';
import { f as findTableByToken, a as findMenuByRestaurantId } from '../../../_/MenuRepository.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mysql2/promise';

async function getTableMenu(token) {
  const table = await findTableByToken(token);
  if (!table) {
    throw new NotFoundError("Table not found");
  }
  const items = await findMenuByRestaurantId(table.restaurantId);
  return {
    table,
    items
  };
}

const _token__get = defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token");
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid table token"
    });
  }
  try {
    return await getTableMenu(token);
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

export { _token__get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/tables/_token_.get');
//# sourceMappingURL=_token_.get.mjs.map
