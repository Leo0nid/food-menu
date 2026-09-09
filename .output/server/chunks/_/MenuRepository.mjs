globalThis.__timing__.logStart('Load chunks/_/MenuRepository');import { e as executeQuery } from './NotFoundError.mjs';

function mapRestaurantTableDbRow(row) {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    name: row.name,
    token: row.token,
    isActive: row.is_active === 1
  };
}

async function findTableByToken(token) {
  const rows = await executeQuery(
    `
      SELECT id, restaurant_id, name, token, is_active
      FROM tables
      WHERE token = ? AND is_active = 1
    `,
    [token]
  );
  const row = rows[0];
  if (!row) {
    return void 0;
  }
  return mapRestaurantTableDbRow(row);
}

function mapMenuItemDbRow(row) {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    name: row.name,
    description: row.description,
    priceKopecks: row.price_kopecks,
    isActive: row.is_active === 1,
    sortOrder: row.sort_order
  };
}

async function findMenuByRestaurantId(restaurantId) {
  const rows = await executeQuery(
    `
      SELECT
        id,
        restaurant_id,
        name,
        description,
        price_kopecks,
        is_active,
        sort_order
      FROM menu_items
      WHERE restaurant_id = ? AND is_active = 1
      ORDER BY sort_order
    `,
    [restaurantId]
  );
  return rows.map(mapMenuItemDbRow);
}

export { findMenuByRestaurantId as a, findTableByToken as f };;globalThis.__timing__.logEnd('Load chunks/_/MenuRepository');
//# sourceMappingURL=MenuRepository.mjs.map
