import { and, eq, sql } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import { user } from "../lib/db/auth-schema";
import { books, favorites, reviews } from "../lib/db/schema";
import { createTestDb, type TestDb } from "./db";

function insertUser(db: TestDb["db"], id: string, name: string, email: string) {
  db.insert(user).values({ id, name, email, emailVerified: true }).run();
}

function insertBook(
  db: TestDb["db"],
  gutenbergId: number,
  title: string,
): number {
  const row = db
    .insert(books)
    .values({
      title,
      author: "Test Author",
      year: 1850,
      description: "A test book of considerable gloom.",
      coverUrl: `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.cover.medium.jpg`,
      gutenbergId,
      gutenbergUrl: `https://www.gutenberg.org/ebooks/${gutenbergId}`,
    })
    .returning({ id: books.id })
    .get();
  return row.id;
}

describe("database behaviour", () => {
  let t: TestDb;
  beforeEach(() => {
    t = createTestDb();
  });

  it("seeds and reads a book", () => {
    const id = insertBook(t.db, 345, "Dracula");
    const found = t.db.select().from(books).where(eq(books.id, id)).get();
    expect(found?.title).toBe("Dracula");
    expect(found?.gutenbergId).toBe(345);
  });

  it("enforces unique gutenberg ids", () => {
    insertBook(t.db, 345, "Dracula");
    expect(() => insertBook(t.db, 345, "Dracula (dup)")).toThrow();
  });

  it("toggles a favourite on and off", () => {
    insertUser(t.db, "u1", "Reader", "reader@test.com");
    const bookId = insertBook(t.db, 84, "Frankenstein");

    t.db.insert(favorites).values({ userId: "u1", bookId }).run();
    let count = t.db.select().from(favorites).all().length;
    expect(count).toBe(1);

    // Toggling off removes it.
    t.db
      .delete(favorites)
      .where(and(eq(favorites.userId, "u1"), eq(favorites.bookId, bookId)))
      .run();
    count = t.db.select().from(favorites).all().length;
    expect(count).toBe(0);
  });

  it("prevents duplicate favourites per user+book", () => {
    insertUser(t.db, "u1", "Reader", "reader@test.com");
    const bookId = insertBook(t.db, 84, "Frankenstein");
    t.db.insert(favorites).values({ userId: "u1", bookId }).run();
    expect(() =>
      t.db.insert(favorites).values({ userId: "u1", bookId }).run(),
    ).toThrow();
  });

  it("allows one review per user per book (upsert)", () => {
    insertUser(t.db, "u1", "Reader", "reader@test.com");
    const bookId = insertBook(t.db, 84, "Frankenstein");

    t.db
      .insert(reviews)
      .values({ userId: "u1", bookId, rating: 5, text: "Haunting." })
      .run();

    // A second insert for the same user+book must fail (unique index).
    expect(() =>
      t.db
        .insert(reviews)
        .values({ userId: "u1", bookId, rating: 4, text: "Changed my mind." })
        .run(),
    ).toThrow();

    // The update path works.
    const existing = t.db
      .select({ id: reviews.id })
      .from(reviews)
      .where(and(eq(reviews.userId, "u1"), eq(reviews.bookId, bookId)))
      .get();
    if (!existing) throw new Error("expected a review to exist");
    t.db
      .update(reviews)
      .set({ rating: 4, text: "Changed my mind." })
      .where(eq(reviews.id, existing.id))
      .run();

    const after = t.db.select().from(reviews).get();
    expect(after?.rating).toBe(4);
    expect(after?.text).toBe("Changed my mind.");
  });

  it("computes an average rating across reviews", () => {
    insertUser(t.db, "u1", "A", "a@test.com");
    insertUser(t.db, "u2", "B", "b@test.com");
    const bookId = insertBook(t.db, 84, "Frankenstein");

    t.db
      .insert(reviews)
      .values([
        { userId: "u1", bookId, rating: 5, text: "Five stars." },
        { userId: "u2", bookId, rating: 3, text: "Three stars." },
      ])
      .run();

    const rows = t.db
      .select({
        avg: sql`avg(${reviews.rating})`,
        count: sql`count(${reviews.id})`,
      })
      .from(reviews)
      .where(eq(reviews.bookId, bookId))
      .all();
    expect(rows[0].count).toBe(2);
    expect(Number(rows[0].avg)).toBeCloseTo(4);
  });

  it("cascades deletes from user to favourites and reviews", () => {
    insertUser(t.db, "u1", "Reader", "reader@test.com");
    const bookId = insertBook(t.db, 84, "Frankenstein");
    t.db.insert(favorites).values({ userId: "u1", bookId }).run();
    t.db
      .insert(reviews)
      .values({ userId: "u1", bookId, rating: 5, text: "Gone soon." })
      .run();

    t.db.delete(user).where(eq(user.id, "u1")).run();

    expect(t.db.select().from(favorites).all().length).toBe(0);
    expect(t.db.select().from(reviews).all().length).toBe(0);
  });
});
