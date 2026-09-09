import { initDb } from "./schema";

void initDb().catch((error) => {
  console.error("Database initialization failed:", error);
});
