import { RestaurantRepository } from "~~/server/repositories/RestaurantRepository";
import { RestaurantMapper } from "~~/server/mappers/RestaurantMapper";

export function GetRestaurantsUsecase() {
  const repo = new RestaurantRepository();
  return repo.getList().map(RestaurantMapper);
}
