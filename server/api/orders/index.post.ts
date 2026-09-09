import { defineEventHandler, readBody, createError } from "h3";
import { ZodError } from "zod";
import { createOrder } from "@usecases/order/CreateOrderUseCase";
import { NotFoundError } from "@errors/NotFoundError";
import { createOrderSchema } from "@usecases/order/dto/CreateOrderDto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const input = createOrderSchema.parse(body);

    return await createOrder(input);
  } catch (error) {
    console.error("Create order error:", error);
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request",
        data: error.flatten(),
      });
    }

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
