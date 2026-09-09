import { randomUUID } from "node:crypto";
import { db, type DbConnection } from "@database/index";
import { findTableByToken } from "~repositories/RestaurantTableRepository";
import { findMenuByRestaurantId } from "~repositories/MenuRepository";
import { saveOrder } from "~repositories/OrderRepository";
import { saveOrderItem } from "~repositories/OrderItemRepository";
import type { CreateOrderDTO } from "./dto/CreateOrderDto";
import { NotFoundError } from "@errors/NotFoundError";
import type { CreateOrderItemDTO } from "./dto/CreateOrderDto";
import type { MenuItem } from "@entities/MenuItemEntity";

type PreparedOrderItem = {
  menuItemId: string;
  nameSnapshot: string;
  priceKopecksSnapshot: number;
  quantity: number;
};

function buildMenuMap(menuItems: MenuItem[]) {
  return new Map(menuItems.map((menuItem) => [menuItem.id, menuItem]));
}

function prepareOrderItems(
  items: CreateOrderItemDTO[],
  menuMap: Map<string, MenuItem>,
) {
  const preparedItems: PreparedOrderItem[] = [];
  let totalKopecks = 0;

  for (const item of items) {
    const menuItem = menuMap.get(item.menuItemId);

    if (!menuItem) {
      throw new NotFoundError(`Menu item not found: ${item.menuItemId}`);
    }

    totalKopecks += menuItem.priceKopecks * item.quantity;

    preparedItems.push({
      menuItemId: menuItem.id,
      nameSnapshot: menuItem.name,
      priceKopecksSnapshot: menuItem.priceKopecks,
      quantity: item.quantity,
    });
  }

  return { preparedItems, totalKopecks };
}

async function saveOrderItems(
  items: PreparedOrderItem[],
  orderId: string,
  connection: DbConnection,
): Promise<void> {
  for (const item of items) {
    await saveOrderItem(
      {
        id: randomUUID(),
        orderId,
        menuItemId: item.menuItemId,
        nameSnapshot: item.nameSnapshot,
        priceKopecksSnapshot: item.priceKopecksSnapshot,
        quantity: item.quantity,
      },
      connection,
    );
  }
}

export async function createOrder(input: CreateOrderDTO) {
  const { tableToken, comment, items } = input;

  const table = await findTableByToken(tableToken);

  if (!table) {
    throw new NotFoundError("Table not found");
  }

  const menuItems = await findMenuByRestaurantId(table.restaurantId);
  const menuMap = buildMenuMap(menuItems);
  const { preparedItems, totalKopecks } = prepareOrderItems(items, menuMap);
  const orderId = randomUUID();

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    await saveOrder(
      {
        id: orderId,
        restaurantId: table.restaurantId,
        tableId: table.id,
        comment: comment ?? null,
        totalKopecks,
      },
      connection,
    );
    await saveOrderItems(preparedItems, orderId, connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

}
