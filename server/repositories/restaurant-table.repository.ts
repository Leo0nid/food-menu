import { db } from "../db";

type TableRow = {
  id: string;
  restaurant_id: string;
  name: string;
  token: string;
  is_active: number;
};

export function findTableByToken(token: string): TableRow | undefined {
  return db
    .prepare(
      `
    SELECT id, restaurant_id, name, token, is_active
    FROM tables
    WHERE token = ? AND is_active = 1
  `,
    )
    .get(token) as TableRow | undefined;
}
