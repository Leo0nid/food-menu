export type RestaurantEntity = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export type CreateRestaurantEntity = Pick<RestaurantEntity, "id" | "name" | "slug">;
