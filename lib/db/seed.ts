/**
 * Seeds the archive with the 100 gothic books from Project Gutenberg.
 *
 * Usage: pnpm db:seed
 *
 * Idempotent — uses upsert on gutenbergId, so re-running is safe.
 */
import { eq } from "drizzle-orm";

import { db } from "./index";
import { books } from "./schema";
import { seedBooks } from "./seed-data";

function coverUrl(gutenbergId: number): string {
  return `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.cover.medium.jpg`;
}

function gutenbergUrl(gutenbergId: number): string {
  return `https://www.gutenberg.org/ebooks/${gutenbergId}`;
}

async function main() {
  const rows = seedBooks.map((b) => ({
    title: b.title,
    author: b.author,
    year: b.year,
    description: b.description,
    coverUrl: coverUrl(b.gutenbergId),
    gutenbergId: b.gutenbergId,
    gutenbergUrl: gutenbergUrl(b.gutenbergId),
  }));

  // Upsert one by one so we can report insert vs. update counts.
  let inserted = 0;
  let updated = 0;
  for (const row of rows) {
    const existing = db
      .select({ id: books.id })
      .from(books)
      .where(eq(books.gutenbergId, row.gutenbergId))
      .get();
    if (existing) {
      db.update(books).set(row).where(eq(books.id, existing.id)).run();
      updated++;
    } else {
      db.insert(books).values(row).run();
      inserted++;
    }
  }

  const total = db.select().from(books).all().length;
  console.log(
    `Seeded ${rows.length} books (${inserted} inserted, ${updated} updated). Total in DB: ${total}`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
