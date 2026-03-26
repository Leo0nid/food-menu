import { db } from "../db";
import type { MenuItem } from "../entities/MenuItemEntity";

export function findMenuByRestaurantId(restaurantId: string): MenuItem[] {
  const rows = db
    .prepare(
      `
      SELECT
        id,
        restaurant_id as restaurantId,
        category_id as categoryId,
        name,
        description,
        price_cents as price,
        is_active as isActive,
        sort_order as sortOrder
      FROM menu_items
      WHERE restaurant_id = ? AND is_active = 1
      ORDER BY sort_order
    `,
    )
    .all(restaurantId);

  return rows as MenuItem[];
}
