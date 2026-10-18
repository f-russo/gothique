/**
 * Story-only stub for `"use server"` actions.
 *
 * The real `@/lib/actions` pulls in the SQLite database (better-sqlite3),
 * which cannot run in the browser. This stub keeps the same signatures so
 * components like FavoriteButton / ReviewDeleteButton render and interact
 * normally in Storybook — they just no-op on the server round-trip.
 */
import type { ActionState } from "@/lib/actions";

export async function toggleFavorite(
  _prev: unknown,
  _bookId: number,
): Promise<{ ok: boolean }> {
  return { ok: true };
}

export async function deleteReview(
  _reviewId: number,
): Promise<{ ok: boolean }> {
  return { ok: true };
}

export async function createReview(
  _prev: unknown,
  _formData: FormData,
): Promise<ActionState> {
  return { ok: true };
}

export async function updateReview(
  _prev: unknown,
  _formData: FormData,
): Promise<ActionState> {
  return { ok: true };
}
