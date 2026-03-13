export type MenuItem = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  isActive: boolean;
  sortOrder: number;
};
