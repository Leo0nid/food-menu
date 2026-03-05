import Database from "better-sqlite3";
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const dataDir = join(process.cwd(), "data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.SQLITE_PATH || join(dataDir, "dev.db");

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
