import type { Order } from "../entities/OrderEntity";

type OrderRow = {
  id: string;
  restaurant_id: string;
  table_id: string;
  status: "new" | "cooking" | "ready" | "done";
  comment: string | null;
  created_at: string;
  updated_at: string;
};

export function mapOrderRow(row: OrderRow): Order {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    tableId: row.table_id,
    status: row.status,
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type { OrderRow };
