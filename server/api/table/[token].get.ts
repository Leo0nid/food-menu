import { defineEventHandler, getRouterParam } from "h3";
import { ValidationError } from "~~/server/errors/validation.error";
import { getTableMenu } from "../../core/get-table-menu";

export default defineEventHandler((event) => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw new ValidationError("Table not found");
  }

  return getTableMenu(token);
});
