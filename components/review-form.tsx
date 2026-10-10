"use client";

import { PenLine } from "lucide-react";
import { useActionState, useState } from "react";
import { StarInput } from "@/components/star-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveReview } from "@/lib/actions";
import type { ReviewWithAuthor } from "@/lib/queries";

/**
 * Create or edit the signed-in user's review for a book.
 */
export function ReviewForm({
  bookId,
  existing,
  signedIn,
}: {
  bookId: number;
  existing?: ReviewWithAuthor;
  signedIn: boolean;
}) {
  const [state, formAction, pending] = useActionState(saveReview, { ok: true });
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [text, setText] = useState(existing?.text ?? "");

  if (!signedIn) {
    return null;
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg border border-border/60 bg-card/50 p-5"
    >
      <input type="hidden" name="bookId" value={bookId} />
      <div className="flex flex-col gap-2">
        <span className="font-serif text-base text-foreground">
          {existing ? "Edit your review" : "Leave your mark"}
        </span>
        <StarInput value={rating} onChange={setRating} />
      </div>
      <div className="flex flex-col gap-2">
        <Textarea
          name="text"
          placeholder="What did this book do to you?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          required
        />
        {state && !state.ok && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={pending || rating === 0}
        className="w-full sm:w-auto"
      >
        <PenLine size={16} className={pending ? "animate-flicker" : ""} />
        {pending
          ? "Inscribing…"
          : existing
            ? "Update review"
            : "Publish review"}
      </Button>
    </form>
  );
}
