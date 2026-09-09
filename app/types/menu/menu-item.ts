export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string | null;
  priceKopecks: number;
  isActive: boolean;
  sortOrder: number;
};
