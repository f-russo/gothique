import Link from "next/link";

import type { BookWithRating } from "@/lib/queries";

import { BookCover } from "./book-cover";
import { FavoriteButton } from "./favorite-button";
import { StarRating } from "./star-rating";

/**
 * A single book in the archive grid.
 */
export function BookCard({
  book,
  isFavorite = false,
}: {
  book: BookWithRating;
  isFavorite?: boolean;
}) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group relative block overflow-hidden rounded-lg border border-border/60 bg-card/60 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_-18px_oklch(0_0_0/80%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <BookCover
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          title={book.title}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Dim the edges so the cover feels kept in shadow. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10" />
        <FavoriteButton
          bookId={book.id}
          isFavorite={isFavorite}
          className="absolute right-2.5 top-2.5"
        />
        <span className="absolute bottom-2.5 left-2.5 rounded-full border border-border/50 bg-background/70 px-2.5 py-0.5 font-serif text-xs tracking-wide text-muted-foreground backdrop-blur-sm">
          {book.year}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 font-serif text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
          {book.title}
        </h3>
        <p className="text-sm italic text-muted-foreground">{book.author}</p>
        <div className="mt-1 flex items-center gap-2">
          {book.reviewCount > 0 ? (
            <>
              <StarRating value={book.avgRating ?? 0} />
              <span className="text-xs text-muted-foreground">
                ({book.reviewCount})
              </span>
            </>
          ) : (
            <span className="text-xs italic text-muted-foreground/60">
              Unreviewed
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
