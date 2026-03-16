import { db } from "../db";

type InsertOrderParams = {
  id: string;
  restaurantId: string;
  tableId: string;
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
