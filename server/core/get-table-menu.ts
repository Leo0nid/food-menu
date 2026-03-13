import { findTableByToken } from "../repositories/restaurant-table.repository";
import { findMenuByRestaurantId } from "../repositories/menu.repository";

export function getTableMenu(token: string) {
  const table = findTableByToken(token);

  if (!table) {
    throw new Error("Table not found");
  }

  const items = findMenuByRestaurantId(table.restaurant_id);

  return {
    table,
    items,
  };
}
