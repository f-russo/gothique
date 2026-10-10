"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { z } from "zod";

import { auth } from "./auth";
import { db } from "./db";
import { books, favorites, reviews } from "./db/schema";
import { reviewInputSchema } from "./schemas";

/**
 * Shared result shape so Client Components can render errors uniformly.
 * The first argument of each action is the previous state (or null on first run).
 */
export type ActionState = { ok: true } | { ok: false; error: string };

type Rating = 1 | 2 | 3 | 4 | 5;

/**
 * Resolve the current user or throw. Every action re-checks auth — server
 * functions are reachable via direct POST, so never trust the client.
 */
async function requireUser() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) {
    throw new Error("You must be signed in to do that.");
  }
  return session.user;
}

/** Revalidate the routes that display favourites / reviews, then refresh the client. */
function revalidateBookViews(bookId?: number) {
  revalidatePath("/");
  revalidatePath("/account");
  if (bookId) revalidatePath(`/books/${bookId}`);
}

/**
 * Toggle the current user's favourite for a book.
 */
export async function toggleFavorite(
  _prev: ActionState | null,
  bookId: number,
): Promise<ActionState> {
  const user = await requireUser();
  const id = Number(bookId);
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: "Unknown book." };
  }

  const where = and(eq(favorites.userId, user.id), eq(favorites.bookId, id));
  const existing = db
    .select({ userId: favorites.userId })
    .from(favorites)
    .where(where)
    .get();

  if (existing) {
    db.delete(favorites).where(where).run();
  } else {
    db.insert(favorites).values({ userId: user.id, bookId: id }).run();
  }

  revalidateBookViews(id);
  return { ok: true };
}

type SaveReviewInput = FormData | z.infer<typeof reviewInputSchema>;

function fromFormData(fd: FormData) {
  return {
    bookId: fd.get("bookId"),
    rating: fd.get("rating"),
    text: fd.get("text"),
  };
}

/**
 * Create or update the current user's review for a book (one per user per book).
 * Accepts FormData (from a form) or a plain object (from an event handler).
 */
export async function saveReview(
  _prev: ActionState | null,
  raw: SaveReviewInput,
): Promise<ActionState> {
  const user = await requireUser();
  const source = raw instanceof FormData ? fromFormData(raw) : raw;
  const parsed = reviewInputSchema.safeParse(source);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid review.",
    };
  }
  const { bookId, text } = parsed.data;
  const rating = parsed.data.rating as Rating;

  const book = db.select().from(books).where(eq(books.id, bookId)).get();
  if (!book) return { ok: false, error: "That book isn't in the archive." };

  const existing = db
    .select({ id: reviews.id })
    .from(reviews)
    .where(and(eq(reviews.userId, user.id), eq(reviews.bookId, bookId)))
    .get();

  if (existing) {
    db.update(reviews)
      .set({ rating, text, updatedAt: new Date() })
      .where(eq(reviews.id, existing.id))
      .run();
  } else {
    db.insert(reviews).values({ userId: user.id, bookId, rating, text }).run();
  }

  revalidateBookViews(bookId);
  return { ok: true };
}

/**
 * Delete one of the current user's reviews.
 */
export async function deleteReview(
  _prev: ActionState | null,
  reviewId: number,
): Promise<ActionState> {
  const user = await requireUser();
  const id = Number(reviewId);
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: "Unknown review." };
  }

  const review = db.select().from(reviews).where(eq(reviews.id, id)).get();
  if (!review) return { ok: false, error: "That review is already gone." };
  if (review.userId !== user.id) {
    return { ok: false, error: "You can only remove your own reviews." };
  }

  db.delete(reviews).where(eq(reviews.id, id)).run();
  revalidateBookViews(review.bookId);
  return { ok: true };
}
