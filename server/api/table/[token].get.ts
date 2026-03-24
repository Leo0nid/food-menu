import { defineEventHandler, getRouterParam } from "h3";
import { ValidationError } from "~~/server/core/errors/ValidationError";
import { getTableMenu } from "../../core/usecase/table/GetTableMenuUseCase";

export default defineEventHandler((event) => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw new ValidationError("Table not found");
  }

  return getTableMenu(token);
});
