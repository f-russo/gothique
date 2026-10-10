import type { BookWithRating } from "@/lib/queries";

import { BookCard } from "./book-card";
import { FadeIn } from "./fade-in";

/**
 * The archive grid — a staggered reveal of the collection.
 */
export function BookGrid({
  books,
  favoriteIds,
}: {
  books: BookWithRating[];
  favoriteIds: Set<number>;
}) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book, i) => (
        <FadeIn as="li" key={book.id} delay={Math.min(i * 0.03, 0.4)}>
          <BookCard book={book} isFavorite={favoriteIds.has(book.id)} />
        </FadeIn>
      ))}
    </ul>
  );
}
