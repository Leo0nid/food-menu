import { createError, defineEventHandler, getRouterParam } from "h3";
import { getOrder } from "../../core/usecase/order/GetOrderUseCase";
import { NotFoundError } from "../../core/errors/NotFoundError";

export default defineEventHandler((event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request",
      });
    }

    return getOrder(id);
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
