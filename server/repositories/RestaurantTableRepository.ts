import { executeQuery } from "@database/index";
import { mapRestaurantTableDbRow } from "@mappers/RestaurantTableMapper";
import type { RestaurantTableDbRow } from "@mappers/RestaurantTableMapper";

export async function findTableByToken(token: string) {
  const rows = await executeQuery<RestaurantTableDbRow>(
    `
      SELECT id, restaurant_id, name, token, is_active
      FROM tables
      WHERE token = ? AND is_active = 1
    `,
    [token],
  );

  const row = rows[0];
  if (!row) {
    return undefined;
  }

  return mapRestaurantTableDbRow(row);
}
