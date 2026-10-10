import type { ReviewWithAuthor } from "@/lib/queries";

import { ReviewDeleteButton } from "./review-delete-button";
import { StarRating } from "./star-rating";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * A single public review.
 */
export function ReviewCard({
  review,
  isOwn,
}: {
  review: ReviewWithAuthor;
  isOwn: boolean;
}) {
  return (
    <article className="rounded-lg border border-border/60 bg-card/40 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-base text-foreground">
            {review.authorName}
          </span>
          <div className="flex items-center gap-2">
            <StarRating value={review.rating} size={13} />
            <span className="text-xs text-muted-foreground/70">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
        {isOwn && (
          <div className="flex items-center gap-1">
            <a
              href="#review-form"
              className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Edit
            </a>
            <ReviewDeleteButton reviewId={review.id} />
          </div>
        )}
      </div>
      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
        {review.text}
      </p>
    </article>
  );
}
