import { db } from "../db";
import type { MenuItem } from "../entities/menu-item.entity";

export function findMenuByRestaurantId(restaurantId: string): MenuItem[] {
  const rows = db
    .prepare(
      `
      SELECT
        id,
        restaurant_id,
        category_id,
        name,
        description,
        price_cents,
        is_active,
        sort_order
      FROM menu_items
      WHERE restaurant_id = ? AND is_active = 1
      ORDER BY sort_order
    `,
    )
    .all(restaurantId);

  return rows as MenuItem[];
}
