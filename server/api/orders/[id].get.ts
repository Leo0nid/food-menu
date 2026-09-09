import { createError, defineEventHandler, getRouterParam } from "h3";
import { getOrder } from "@usecases/order/GetOrderUseCase";
import { NotFoundError } from "@errors/NotFoundError";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request",
    });
  }

  try {
    return await getOrder(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw createError({
        statusCode: 404,
        statusMessage: error.message,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
