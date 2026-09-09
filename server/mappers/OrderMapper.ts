import type { Order } from "@entities/OrderEntity";

type OrderDbRow = {
  id: string;
  restaurant_id: string;
  table_id: string;
  status: "new" | "cooking" | "ready" | "done";
  comment: string | null;
  total_kopecks: number;
  created_at: string;
  updated_at: string;
};

export function mapOrderRow(row: OrderDbRow): Order {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    tableId: row.table_id,
    status: row.status,
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    totalKopecks: row.total_kopecks,
  };
}

export type { OrderDbRow };
