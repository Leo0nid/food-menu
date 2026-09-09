import { findTableByToken } from "~repositories/RestaurantTableRepository";
import { findMenuByRestaurantId } from "~repositories/MenuRepository";
import { NotFoundError } from "@errors/NotFoundError";

export async function getTableMenu(token: string) {
  const table = await findTableByToken(token);

  if (!table) {
    throw new NotFoundError("Table not found");
  }

  const items = await findMenuByRestaurantId(table.restaurantId);

  return {
    table,
    items,
  };
}
