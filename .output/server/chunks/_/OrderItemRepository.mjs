globalThis.__timing__.logStart('Load chunks/_/OrderItemRepository');import { d as db, e as executeQuery } from './NotFoundError.mjs';

function mapOrderRow(row) {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    tableId: row.table_id,
    status: row.status,
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    totalKopecks: row.total_kopecks
  };
}

async function saveOrder(params, connection) {
  const executor = connection != null ? connection : db;
  await executor.execute(
    `
      INSERT INTO orders (
        id,
        restaurant_id,
        table_id,
        status,
        comment,
        total_kopecks,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, 'new', ?, ?, NOW(), NOW())
    `,
    [
      params.id,
      params.restaurantId,
      params.tableId,
      params.comment,
      params.totalKopecks
    ]
  );
}
async function findOrderById(id) {
  const rows = await executeQuery(
    `
      SELECT
        id,
        restaurant_id,
        table_id,
        status,
        comment,
        total_kopecks,
        created_at,
        updated_at
      FROM orders
      WHERE id = ?
    `,
    [id]
  );
  const row = rows[0];
  if (!row) return void 0;
  return mapOrderRow(row);
}

function mapOrderItemRow(row) {
  return {
    id: row.id,
    orderId: row.order_id,
    menuItemId: row.menu_item_id,
    nameSnapshot: row.name_snapshot,
    priceKopecksSnapshot: row.price_kopecks_snapshot,
    quantity: row.qty
  };
}

async function saveOrderItem(params, connection) {
  const executor = connection != null ? connection : db;
  await executor.execute(
    `
      INSERT INTO order_items (
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_kopecks_snapshot,
        qty
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      params.id,
      params.orderId,
      params.menuItemId,
      params.nameSnapshot,
      params.priceKopecksSnapshot,
      params.quantity
    ]
  );
}
async function getOrderItemsByOrderId(orderId) {
  const rows = await executeQuery(
    `
      SELECT
        id,
        order_id,
        menu_item_id,
        name_snapshot,
        price_kopecks_snapshot,
        qty
      FROM order_items
      WHERE order_id = ?
    `,
    [orderId]
  );
  return rows.map(mapOrderItemRow);
}

export { saveOrderItem as a, findOrderById as f, getOrderItemsByOrderId as g, saveOrder as s };;globalThis.__timing__.logEnd('Load chunks/_/OrderItemRepository');
//# sourceMappingURL=OrderItemRepository.mjs.map
