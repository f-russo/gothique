import { describe, expect, it } from "vitest";

import { seedBooks } from "../lib/db/seed-data";

describe("seed catalogue", () => {
  it("contains exactly 100 books", () => {
    expect(seedBooks).toHaveLength(100);
  });

  it("has unique Gutenberg ids", () => {
    const ids = seedBooks.map((b) => b.gutenbergId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique titles (case-insensitive)", () => {
    const titles = seedBooks.map((b) => b.title.trim().toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("every book has a complete, sensible record", () => {
    for (const b of seedBooks) {
      expect(b.gutenbergId, `gutenbergId for ${b.title}`).toBeGreaterThan(0);
      expect(
        b.title.trim().length,
        `title for ${b.gutenbergId}`,
      ).toBeGreaterThan(0);
      expect(b.author.trim().length, `author for ${b.title}`).toBeGreaterThan(
        0,
      );
      // The archive spans the Gothic's birth to the modern weird tale.
      expect(b.year, `year for ${b.title}`).toBeGreaterThanOrEqual(1760);
      expect(b.year, `year for ${b.title}`).toBeLessThanOrEqual(1950);
      expect(
        b.description.trim().length,
        `description for ${b.title}`,
      ).toBeGreaterThan(40);
    }
  });

  it("includes the canonical gothic classics", () => {
    const titles = new Set(seedBooks.map((b) => b.title.toLowerCase()));
    for (const classic of [
      "dracula",
      "frankenstein",
      "jane eyre",
      "carmilla",
    ]) {
      expect(
        [...titles].some((t) => t.includes(classic)),
        `expected a book matching "${classic}"`,
      ).toBe(true);
    }
  });
});
