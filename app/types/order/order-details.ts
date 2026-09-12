export type OrderDetails = {
  order: {
    id: string;
    tableId: string;
    status: "new" | "cooking" | "ready" | "done";
    comment: string | null;
    totalKopecks: number;
    createdAt: string;
  };

  items: {
    id: string;
    nameSnapshot: string;
    priceKopecksSnapshot: number;
    quantity: number;
  }[];
};
