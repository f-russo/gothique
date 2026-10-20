import { describe, expect, it } from "vitest";

import { parseReviewInput, reviewInputFromFormData } from "@/lib/review-input";

function makeForm(values: Record<string, string | null>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value !== null) fd.append(key, value);
  }
  return fd;
}

describe("reviewInputFromFormData", () => {
  it("flattens form fields into the plain shape", () => {
    const fd = makeForm({ bookId: "7", rating: "5", text: "Superb." });
    expect(reviewInputFromFormData(fd)).toEqual({
      bookId: "7",
      rating: "5",
      text: "Superb.",
    });
  });

  it("yields null for missing fields", () => {
    const fd = makeForm({ bookId: "7" });
    const flat = reviewInputFromFormData(fd);
    expect(flat.rating).toBeNull();
    expect(flat.text).toBeNull();
  });
});

describe("parseReviewInput", () => {
  it("parses a valid FormData payload", () => {
    const res = parseReviewInput(
      makeForm({ bookId: "3", rating: "4", text: "Delightfully grim." }),
    );
    expect(res).toEqual({
      ok: true,
      data: { bookId: 3, rating: 4, text: "Delightfully grim." },
    });
  });

  it("parses a valid plain object payload", () => {
    const res = parseReviewInput({
      bookId: 3,
      rating: 4,
      text: "Delightfully grim.",
    });
    expect(res.ok).toBe(true);
  });

  it("returns the first validation error message for FormData", () => {
    const res = parseReviewInput(
      makeForm({ bookId: "3", rating: "9", text: "" }),
    );
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(typeof res.error).toBe("string");
      expect(res.error.length).toBeGreaterThan(0);
    }
  });

  it("rejects FormData with missing fields", () => {
    expect(parseReviewInput(makeForm({ bookId: "3" })).ok).toBe(false);
    expect(parseReviewInput(new FormData()).ok).toBe(false);
  });

  it("rejects invalid plain objects", () => {
    expect(
      parseReviewInput({ bookId: 0, rating: 3, text: "Fine text." }).ok,
    ).toBe(false);
    expect(parseReviewInput({ rating: 3, text: "Fine text." }).ok).toBe(false);
    expect(parseReviewInput(null).ok).toBe(false);
    expect(parseReviewInput("not an object").ok).toBe(false);
  });
});
