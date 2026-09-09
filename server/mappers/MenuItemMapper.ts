import type { MenuItem } from "@entities/MenuItemEntity";

export type MenuItemDbRow = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  price_kopecks: number;
  is_active: number;
  sort_order: number;
};

export function mapMenuItemDbRow(row: MenuItemDbRow): MenuItem {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    name: row.name,
    description: row.description,
    priceKopecks: row.price_kopecks,
    isActive: row.is_active === 1,
    sortOrder: row.sort_order,
  };
}
