import { db } from "./index";

export function initDb() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS restaurants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tables (
      id TEXT PRIMARY KEY,
      restaurant_id TEXT NOT NULL,
      name TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_tables_restaurant
      ON tables(restaurant_id);

    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      restaurant_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      price_cents INTEGER NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant
      ON menu_items(restaurant_id);

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      restaurant_id TEXT NOT NULL,
      table_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      comment TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
      FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_orders_restaurant_created
      ON orders(restaurant_id, created_at);

    CREATE INDEX IF NOT EXISTS idx_orders_restaurant_status
      ON orders(restaurant_id, status);

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      menu_item_id TEXT NOT NULL,
      name_snapshot TEXT NOT NULL,
      price_cents_snapshot INTEGER NOT NULL,
      qty INTEGER NOT NULL,
      item_comment TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_order_items_order
      ON order_items(order_id);
  `);
}
