import { db } from "../../db";
import type { Statement } from "better-sqlite3";
import type { RestaurantRow } from "../../types/RestaurantRow";

export const stmtList: Statement<[], RestaurantRow> = db.prepare(`
  SELECT id, name, slug, created_at
  FROM restaurants
  ORDER BY created_at DESC
  LIMIT 20
`);

export const stmtGetById: Statement<[string], RestaurantRow> = db.prepare(`
  SELECT id, name, slug, created_at
  FROM restaurants
  WHERE id = ?
`);

export const stmtGetBySlug: Statement<[string], RestaurantRow> = db.prepare(`
  SELECT id, name, slug, created_at
  FROM restaurants
  WHERE slug = ?
`);

export const stmtInsert = db.prepare<[string, string, string]>(`
  INSERT INTO restaurants (id, name, slug)
  VALUES (?, ?, ?)
`);

export const stmtDelete = db.prepare<[string]>(`
  DELETE FROM restaurants WHERE id = ?
`);
