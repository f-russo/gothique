import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as authSchema from "./auth-schema";
import * as appSchema from "./schema";

/**
 * Single shared SQLite connection for the whole app.
 *
 * better-sqlite3 is synchronous and auto-externalised by Next.js, so this is
 * safe to import from Server Components, Server Actions and Route Handlers.
 */
const globalForDb = globalThis as unknown as {
  sqlite: Database.Database | undefined;
};

const dbFile = process.env.DATABASE_FILE ?? "./data/gothique.db";
mkdirSync(path.dirname(dbFile), { recursive: true });

const sqlite =
  globalForDb.sqlite ?? new Database(dbFile, { fileMustExist: false });

// Sensible pragmas for a small read-heavy archive.
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

if (process.env.NODE_ENV !== "production") globalForDb.sqlite = sqlite;

export const db = drizzle(sqlite, {
  schema: { ...authSchema, ...appSchema },
});

export type NewBook = typeof appSchema.books.$inferInsert;
export type Book = typeof appSchema.books.$inferSelect;
