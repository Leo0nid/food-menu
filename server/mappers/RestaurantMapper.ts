import type { RestaurantRow } from "../types/RestaurantRow";
import type { RestaurantEntity } from "../entities/RestaurantEntity";

export function RestaurantMapper(row: RestaurantRow): RestaurantEntity {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.created_at,
  };
}
