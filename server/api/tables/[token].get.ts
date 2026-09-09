import { createError, defineEventHandler, getRouterParam } from "h3";
import { NotFoundError } from "@errors/NotFoundError";
import { getTableMenu } from "@usecases/table/GetTableMenuUseCase";

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid table token",
    });
  }

  try {
    return await getTableMenu(token);
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
