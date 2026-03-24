import type { RestaurantTable } from "../entities/RestaurantTableEntity";

type RestaurantTableRow = {
  id: string;
  restaurant_id: string;
  name: string;
  token: string;
  is_active: number;
};

export function mapRestaurantTableMenuRow(
  row: RestaurantTableRow,
): RestaurantTable {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    name: row.name,
    token: row.token,
    isActive: row.is_active === 1,
  };
}

export type { RestaurantTableRow };
