import { defineEventHandler, readBody, createError } from "h3";
import { ZodError } from "zod";
import { createOrder } from "../../core/usecase/order/CreateOrderUseCase";
import { createOrderSchema } from "../../core/usecase/order/dto/CreateOrderDto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const input = createOrderSchema.parse(body);

    return createOrder(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request",
        data: error.flatten(),
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
