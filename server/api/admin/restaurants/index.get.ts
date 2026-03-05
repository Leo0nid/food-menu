import { GetRestaurantsUsecase } from "../../../core/usecase/GetRestaurantsUsecase";

export default defineEventHandler(() => {
  return GetRestaurantsUsecase();
});
