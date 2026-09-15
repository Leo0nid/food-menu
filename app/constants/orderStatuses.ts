import type { OrderDetails } from "~/types/order/order-details";

export const orderStatusColumns = [
  {
    status: "new",
    label: "Новые",
    orderLabel: "Новый",
    badgeClass: "bg-amber-100 text-amber-800",
  },
  {
    status: "cooking",
    label: "Готовятся",
    orderLabel: "Готовится",
    badgeClass: "bg-blue-100 text-blue-800",
  },
  {
    status: "ready",
    label: "Готовы",
    orderLabel: "Готов",
    badgeClass: "bg-green-100 text-green-800",
  },
  {
    status: "done",
    label: "Завершены",
    orderLabel: "Завершён",
    badgeClass: "bg-neutral-200 text-neutral-700",
  },
] as const satisfies ReadonlyArray<{
  status: OrderDetails["order"]["status"];
  label: string;
  orderLabel: string;
  badgeClass: string;
}>;
