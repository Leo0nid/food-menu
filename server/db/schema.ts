import { db } from "./index";

export async function initDb(): Promise<void> {
  const connection = await db.getConnection();

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS tables (
        id VARCHAR(36) PRIMARY KEY,
        restaurant_id VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_tables_restaurant (restaurant_id),
        CONSTRAINT fk_tables_restaurant
          FOREIGN KEY (restaurant_id)
          REFERENCES restaurants(id)
          ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id VARCHAR(36) PRIMARY KEY,
        restaurant_id VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NULL,
        price_kopecks INT NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        sort_order INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_menu_items_restaurant (restaurant_id),
        CONSTRAINT fk_menu_items_restaurant
          FOREIGN KEY (restaurant_id)
          REFERENCES restaurants(id)
          ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        restaurant_id VARCHAR(36) NOT NULL,
        table_id VARCHAR(36) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        comment TEXT NULL,
        total_kopecks INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_orders_restaurant_created (restaurant_id, created_at),
        INDEX idx_orders_restaurant_status (restaurant_id, status),
        CONSTRAINT fk_orders_restaurant
          FOREIGN KEY (restaurant_id)
          REFERENCES restaurants(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_orders_table
          FOREIGN KEY (table_id)
          REFERENCES tables(id)
          ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id VARCHAR(36) PRIMARY KEY,
        order_id VARCHAR(36) NOT NULL,
        menu_item_id VARCHAR(36) NOT NULL,
        name_snapshot VARCHAR(255) NOT NULL,
        price_kopecks_snapshot INT NOT NULL,
        qty INT NOT NULL,
        item_comment TEXT NULL,
        INDEX idx_order_items_order (order_id),
        CONSTRAINT fk_order_items_order
          FOREIGN KEY (order_id)
          REFERENCES orders(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_order_items_menu_item
          FOREIGN KEY (menu_item_id)
          REFERENCES menu_items(id)
          ON DELETE CASCADE
      )
    `);
  } finally {
    connection.release();
  }
}
