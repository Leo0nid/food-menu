import { createPool, type PoolConnection } from "mysql2/promise";
import { initDb } from "./schema";

const host = process.env.MYSQL_HOST ?? "127.0.0.1";
const port = Number(process.env.MYSQL_PORT ?? 3306);
const user = process.env.MYSQL_USER ?? "root";
const password = process.env.MYSQL_PASSWORD ?? "password";
const database = process.env.MYSQL_DATABASE ?? "food_menu";

export const db = createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

void initDb().catch((error) => {
  console.error("Database initialization failed:", error);
});

export type DbConnection = PoolConnection;

export async function executeQuery<T = Record<string, unknown>>(
  sql: string,
  params?: Array<string | number | boolean | null>,
  connection?: DbConnection,
): Promise<T[]> {
  const values = params ?? [];

  if (connection) {
    const [rows] = await connection.execute(sql, values);
    return rows as T[];
  }

  const [rows] = await db.execute(sql, values);
  return rows as T[];
}
