import type { RestaurantTable } from "@entities/RestaurantTableEntity";

type RestaurantTableDbRow = {
  id: string;
  restaurant_id: string;
  name: string;
  token: string;
  is_active: number;
};

export function mapRestaurantTableDbRow(
  row: RestaurantTableDbRow,
): RestaurantTable {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    name: row.name,
    token: row.token,
    isActive: row.is_active === 1,
  };
}

export type { RestaurantTableDbRow };
