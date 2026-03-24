import { findTableByToken } from "../../../repositories/RestaurantTableRepository";
import { findMenuByRestaurantId } from "../../../repositories/MenuRepository";

export function getTableMenu(token: string) {
  const table = findTableByToken(token);

  if (!table) {
    throw new Error("Table not found");
  }

  const items = findMenuByRestaurantId(table.restaurantId);

  return {
    table,
    items,
  };
}
