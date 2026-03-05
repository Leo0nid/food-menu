import { db } from "../../db";

export default defineEventHandler((event) => {
  const q = getQuery(event);
  const tableToken = String(q.tableToken || "").trim();
  if (!tableToken)
    throw createError({
      statusCode: 400,
      statusMessage: "tableToken required",
    });

  const table = db
    .prepare(
      `
    SELECT t.id, t.name, t.restaurant_id, r.name AS restaurant_name
    FROM tables t
    JOIN restaurants r ON r.id = t.restaurant_id
    WHERE t.token = ? AND t.is_active = 1
  `,
    )
    .get(tableToken) as any;

  if (!table)
    throw createError({ statusCode: 404, statusMessage: "table not found" });

  const categories = db
    .prepare(
      `
    SELECT id, name, sort_order
    FROM menu_categories
    WHERE restaurant_id = ?
    ORDER BY sort_order, name
  `,
    )
    .all(table.restaurant_id);

  const items = db
    .prepare(
      `
    SELECT id, category_id, name, description, price_cents, sort_order
    FROM menu_items
    WHERE restaurant_id = ? AND is_active = 1
    ORDER BY sort_order, name
  `,
    )
    .all(table.restaurant_id);

  return {
    restaurant: { id: table.restaurant_id, name: table.restaurant_name },
    table: { id: table.id, name: table.name, token: tableToken },
    categories,
    items,
  };
});
