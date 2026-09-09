import type { MenuItem } from "./menu-item";
import type { RestaurantTable } from "../restaurant/restaurant-table";

export type TableMenuResponse = {
  table: RestaurantTable;
  items: MenuItem[];
};
