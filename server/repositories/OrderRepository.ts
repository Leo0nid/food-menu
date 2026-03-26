import { db } from "../db";
import { mapOrderRow } from "../mappers/OrderMapper";
import type { OrderRow } from "../mappers/OrderMapper";

type InsertOrderParams = {
  id: string;
  restaurantId: string;
  tableId: string;
  totalPrice: number;
  comment: string | null;
};

export function insertOrder(params: InsertOrderParams) {
  return db
    .prepare(
      `
      INSERT INTO orders (
        id,
        restaurant_id,
        table_id,
        status,
        comment,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, 'new', ?, datetime('now'), datetime('now'))
    `,
    )
    .run(params.id, params.restaurantId, params.tableId, params.comment);
}

export function findOrderById(id: string) {
  const row = db
    .prepare(
      `
      SELECT
        id,
        restaurant_id,
        table_id,
        status,
        comment,
        created_at,
        updated_at
      FROM orders
      WHERE id = ?
    `,
    )
    .get(id) as OrderRow | undefined;

  if (!row) return undefined;

  return mapOrderRow(row);
}
