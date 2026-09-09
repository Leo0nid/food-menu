import { db, executeQuery, type DbConnection } from "@database/index";
import { mapOrderRow } from "@mappers/OrderMapper";
import type { OrderDbRow } from "@mappers/OrderMapper";

type InsertOrderParams = {
  id: string;
  restaurantId: string;
  tableId: string;
  totalKopecks: number;
  comment: string | null;
};

export async function saveOrder(
  params: InsertOrderParams,
  connection?: DbConnection,
): Promise<void> {
  const executor = connection ?? db;
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
      params.totalKopecks,
    ],
  );
}

export async function findOrderById(id: string) {
  const rows = await executeQuery<OrderDbRow>(
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
    [id],
  );

  const row = rows[0];
  if (!row) return undefined;

  return mapOrderRow(row);
}

export async function findOrdersByRestaurantId(restaurantId: string) {
  const rows = await executeQuery<OrderDbRow>(
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
      WHERE restaurant_id = ?
      ORDER BY created_at DESC
    `,
    [restaurantId],
  );

  return rows.map(mapOrderRow);
}
