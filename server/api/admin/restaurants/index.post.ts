import { CreateRestaurantUsecase } from "../../../core/usecase/CreateRestaurantUsecase";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return CreateRestaurantUsecase(body ?? {});
});
