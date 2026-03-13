import { getTableMenu } from "../../core/get-table-menu";

export default defineEventHandler((event) => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw createError({ statusCode: 400 });
  }

  return getTableMenu(token);
});
