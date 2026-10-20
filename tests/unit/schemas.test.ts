import { describe, expect, it } from "vitest";

import {
  ratingSchema,
  reviewInputSchema,
  reviewTextSchema,
} from "@/lib/schemas";

const base = { bookId: 1, rating: 3, text: "Some text here." };

describe("ratingSchema", () => {
  it("accepts the boundary values 1 and 5", () => {
    expect(ratingSchema.safeParse(1).success).toBe(true);
    expect(ratingSchema.safeParse(5).success).toBe(true);
  });

  it("rejects values just outside the boundaries", () => {
    expect(ratingSchema.safeParse(0).success).toBe(false);
    expect(ratingSchema.safeParse(6).success).toBe(false);
  });

  it("rejects non-integers and non-numbers", () => {
    expect(ratingSchema.safeParse(2.5).success).toBe(false);
    expect(ratingSchema.safeParse("stars").success).toBe(false);
    expect(ratingSchema.safeParse(null).success).toBe(false);
  });

  it("coerces numeric strings", () => {
    const res = ratingSchema.safeParse("4");
    expect(res.success).toBe(true);
    if (res.success) expect(res.data).toBe(4);
  });

  it("uses friendly error messages", () => {
    const tooLow = ratingSchema.safeParse(0);
    if (!tooLow.success) {
      expect(tooLow.error.issues[0]?.message).toBe("Give it at least 1 star.");
    }
    const tooHigh = ratingSchema.safeParse(6);
    if (!tooHigh.success) {
      expect(tooHigh.error.issues[0]?.message).toBe(
        "5 stars is the ceiling, darling.",
      );
    }
  });
});

describe("reviewTextSchema", () => {
  it("accepts the boundary lengths 3 and 5000", () => {
    expect(reviewTextSchema.safeParse("abc").success).toBe(true);
    expect(reviewTextSchema.safeParse("x".repeat(5000)).success).toBe(true);
  });

  it("rejects lengths just outside the boundaries", () => {
    expect(reviewTextSchema.safeParse("ab").success).toBe(false);
    expect(reviewTextSchema.safeParse("x".repeat(5001)).success).toBe(false);
  });

  it("trims surrounding whitespace before validating", () => {
    const res = reviewTextSchema.safeParse("  ab  ");
    // "ab" is only 2 chars after trimming → rejected.
    expect(res.success).toBe(false);
    const ok = reviewTextSchema.safeParse("  abc  ");
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data).toBe("abc");
  });

  it("rejects missing text", () => {
    expect(reviewTextSchema.safeParse(undefined).success).toBe(false);
  });
});

describe("reviewInputSchema", () => {
  it("accepts a valid review", () => {
    expect(reviewInputSchema.safeParse(base).success).toBe(true);
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

  it("rejects a missing, zero or fractional bookId", () => {
    for (const bookId of [undefined, 0, -1, 1.5, "not-a-number"]) {
      expect(
        reviewInputSchema.safeParse({ ...base, bookId }).success,
        `bookId ${String(bookId)} should be rejected`,
      ).toBe(false);
    }
  });

  it("rejects an invalid rating even when text is fine", () => {
    expect(reviewInputSchema.safeParse({ ...base, rating: 0 }).success).toBe(
      false,
    );
  });

  it("rejects an invalid text even when rating is fine", () => {
    expect(reviewInputSchema.safeParse({ ...base, text: "" }).success).toBe(
      false,
    );
  });
});
