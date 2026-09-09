export type Order = {
  id: string;
  restaurantId: string;
  tableId: string;
  status: "new" | "cooking" | "ready" | "done";
  totalKopecks: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};
