import { db } from "../db";
import { mapRestaurantTableRow } from "../mappers/RestaurantTableMapper";
import type { RestaurantTableRow } from "../mappers/RestaurantTableMapper";

export function findTableByToken(token: string) {
  const row = db
    .prepare(
      `
      SELECT id, restaurant_id, name, token, is_active
      FROM tables
      WHERE token = ? AND is_active = 1
    `,
    )
    .get(token) as RestaurantTableRow | undefined;

  if (!row) {
    return undefined;
  }

  return mapRestaurantTableRow(row);
}
