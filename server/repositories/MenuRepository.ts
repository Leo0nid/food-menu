import { executeQuery } from "@database/index";
import type { MenuItem } from "@entities/MenuItemEntity";
import {
  mapMenuItemDbRow,
  type MenuItemDbRow,
} from "@mappers/MenuItemMapper";

export async function findMenuByRestaurantId(
  restaurantId: string,
): Promise<MenuItem[]> {
  const rows = await executeQuery<MenuItemDbRow>(
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
    [restaurantId],
  );

  return rows.map(mapMenuItemDbRow);
}
