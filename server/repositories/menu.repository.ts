import { db } from "../db";

export function findMenuByRestaurantId(restaurantId: string) {
  return db
    .prepare(
      `
    SELECT id, restaurant_id, category_id, name, description, price_cents, is_active, sort_order
    FROM menu_items
    WHERE restaurant_id = ? AND is_active = 1
    ORDER BY sort_order ASC, created_at ASC
  `,
    )
    .all(restaurantId);
}
