import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { user } from "../lib/db/auth-schema";
import * as appSchema from "../lib/db/schema";

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * An isolated in-memory SQLite database with the app schema applied.
 * Returns both the drizzle instance and the raw connection (for assertions).
 */
export function createTestDb() {
  const sqlite = new Database(":memory:");
  sqlite.pragma("foreign_keys = ON");
  const sql = readFileSync(path.join(here, "schema.sql"), "utf8");
  sqlite.exec(sql);
  const db = drizzle(sqlite, { schema: { ...appSchema, user } });
  return { db, sqlite };
}

export type TestDb = ReturnType<typeof createTestDb>;
