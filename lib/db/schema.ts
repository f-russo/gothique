import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";

/**
 * A gothic book in the archive. Sourced from Project Gutenberg.
 */
export const books = sqliteTable("book", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  author: text("author").notNull(),
  year: integer("year").notNull(),
  description: text("description").notNull(),
  coverUrl: text("cover_url").notNull(),
  gutenbergId: integer("gutenberg_id").notNull().unique(),
  gutenbergUrl: text("gutenberg_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .defaultNow()
    .notNull(),
});

/**
 * A user's favourite book. Composite primary key (one favourite per pair).
 */
export const favorites = sqliteTable(
  "favorite",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("favorite_user_book_idx").on(table.userId, table.bookId),
    index("favorite_book_idx").on(table.bookId),
  ],
);

/**
 * A public review of a book (1–5 stars + text).
 * One review per user per book (upsert on update).
 */
export const reviews = sqliteTable(
  "review",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull().$type<1 | 2 | 3 | 4 | 5>(),
    text: text("text").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .defaultNow()
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("review_user_book_idx").on(table.userId, table.bookId),
    index("review_book_idx").on(table.bookId),
  ],
);

export const bookRelations = relations(books, ({ many }) => ({
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const favoriteRelations = relations(favorites, ({ one }) => ({
  user: one(user, { fields: [favorites.userId], references: [user.id] }),
  book: one(books, { fields: [favorites.bookId], references: [books.id] }),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(user, { fields: [reviews.userId], references: [user.id] }),
  book: one(books, { fields: [reviews.bookId], references: [books.id] }),
}));
