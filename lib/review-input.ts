import { type ReviewInput, reviewInputSchema } from "./schemas";

/**
 * Pure parsing/validation of review input, shared by the `saveReview` server
 * action and unit tests. Kept free of "use server", next/headers and the DB.
 */

export type ParsedReviewInput =
  | { ok: true; data: ReviewInput }
  | { ok: false; error: string };

/** Flatten a FormData payload into the plain shape the schema expects. */
export function reviewInputFromFormData(fd: FormData) {
  return {
    bookId: fd.get("bookId"),
    rating: fd.get("rating"),
    text: fd.get("text"),
  };
}

/**
 * Validate review input coming either from a form (FormData, all values
 * strings) or from an event handler (plain object). Returns the first
 * validation error message, matching what the action used to surface.
 */
export function parseReviewInput(raw: FormData | unknown): ParsedReviewInput {
  const source = raw instanceof FormData ? reviewInputFromFormData(raw) : raw;
  const parsed = reviewInputSchema.safeParse(source);
  if (parsed.success) return { ok: true, data: parsed.data };
  return {
    ok: false,
    error: parsed.error.issues[0]?.message ?? "Invalid review.",
  };
}
