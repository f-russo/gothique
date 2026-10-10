import { Suspense } from "react";

import { BookGrid } from "@/components/book-grid";
import { FadeIn } from "@/components/fade-in";
import { getFavoriteBookIds, listBooks } from "@/lib/queries";
import { getCurrentUser } from "@/lib/session";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <FadeIn className="mb-10 max-w-2xl sm:mb-14">
        <p className="mb-3 font-serif text-sm uppercase tracking-[0.3em] text-primary/80">
          Est. in candlelight
        </p>
        <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          A gothic book archive
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          One hundred classics of the dark imagination — drawn from Project
          Gutenberg, kept in shadow, and waiting for your mark. Favourite the
          books that haunt you, and leave a review for the ones that won&rsquo;t
          let you sleep.
        </p>
      </FadeIn>

      <Suspense fallback={<GridSkeleton />}>
        <Archive />
      </Suspense>
    </main>
  );
}

/** Reads the session for the current user's favourites, so it streams in. */
async function Archive() {
  const user = await getCurrentUser();
  const books = listBooks();
  const favoriteIds = user ? getFavoriteBookIds(user.id) : new Set<number>();
  return <BookGrid books={books} favoriteIds={favoriteIds} />;
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }, (_, i) => `skeleton-${i}`).map((key) => (
        <div
          key={key}
          className="animate-pulse overflow-hidden rounded-lg border border-border/60 bg-card/40"
        >
          <div className="aspect-[2/3] w-full bg-secondary/50" />
          <div className="space-y-2 p-3">
            <div className="h-4 w-3/4 rounded bg-secondary/60" />
            <div className="h-3 w-1/2 rounded bg-secondary/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
