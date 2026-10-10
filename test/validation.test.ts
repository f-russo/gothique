import { describe, expect, it } from "vitest";

import { reviewInputSchema } from "../lib/schemas";

describe("reviewInputSchema", () => {
  it("accepts a valid review", () => {
    const res = reviewInputSchema.safeParse({
      bookId: 1,
      rating: 5,
      text: "A masterwork of the dark.",
    });
    expect(res.success).toBe(true);
  });

  it("coerces string numbers from form data", () => {
    const res = reviewInputSchema.safeParse({
      bookId: "12",
      rating: "4",
      text: "Chilling and beautiful.",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.bookId).toBe(12);
      expect(res.data.rating).toBe(4);
    }
  });

  it("rejects ratings outside 1–5", () => {
    for (const rating of [0, 6, -1, 100]) {
      const res = reviewInputSchema.safeParse({
        bookId: 1,
        rating,
        text: "Some text here.",
      });
      expect(res.success, `rating ${rating} should be rejected`).toBe(false);
    }
  });

  it("rejects non-integer ratings", () => {
    const res = reviewInputSchema.safeParse({
      bookId: 1,
      rating: 3.5,
      text: "Some text here.",
    });
    expect(res.success).toBe(false);
  });

  it("rejects empty or too-short text", () => {
    for (const text of ["", "  ", "ab"]) {
      const res = reviewInputSchema.safeParse({
        bookId: 1,
        rating: 3,
        text,
      });
      expect(res.success, `text "${text}" should be rejected`).toBe(false);
    }
  });

  it("rejects text over 5000 characters", () => {
    const res = reviewInputSchema.safeParse({
      bookId: 1,
      rating: 3,
      text: "x".repeat(5001),
    });
    expect(res.success).toBe(false);
  });

  it("rejects a missing or invalid bookId", () => {
    expect(
      reviewInputSchema.safeParse({ rating: 3, text: "Some text here." })
        .success,
    ).toBe(false);
    expect(
      reviewInputSchema.safeParse({
        bookId: 0,
        rating: 3,
        text: "Some text here.",
      }).success,
    ).toBe(false);
  });
});
