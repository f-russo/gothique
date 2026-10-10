import { z } from "zod";

/**
 * Shared validation schemas. Kept free of "use server" so they can be imported
 * from both Server Actions and tests.
 */

export const ratingSchema = z.coerce
  .number({ message: "Pick a rating from 1 to 5." })
  .int()
  .min(1, "Give it at least 1 star.")
  .max(5, "5 stars is the ceiling, darling.");

export const reviewTextSchema = z
  .string({ message: "A few words, if you please." })
  .trim()
  .min(3, "Tell us a little more (3+ characters).")
  .max(5000, "That's rather long — keep it under 5000 characters.");

export const reviewInputSchema = z.object({
  bookId: z.coerce.number().int().positive({ message: "Unknown book." }),
  rating: ratingSchema,
  text: reviewTextSchema,
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;
