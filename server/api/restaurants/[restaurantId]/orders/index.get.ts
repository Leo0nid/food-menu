import { getRestaurantOrders } from "@usecases/order/GetRestaurantOrdersUseCase";

export default defineEventHandler(async (event) => {
  const restaurantId = getRouterParam(event, "restaurantId")?.trim();

  if (!restaurantId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Restaurant ID is required",
    });
  }

  return await getRestaurantOrders(restaurantId);
});
