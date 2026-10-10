import { Heart, PenLine } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AccountTabs } from "@/components/account-tabs";
import { BookCover } from "@/components/book-cover";
import { FadeIn } from "@/components/fade-in";
import { FavoriteButton } from "@/components/favorite-button";
import { ReviewDeleteButton } from "@/components/review-delete-button";
import { StarRating } from "@/components/star-rating";
import { getUserFavorites, getUserReviews } from "@/lib/queries";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "My Shelf" };

function FavoriteRow({
  bookId,
  title,
  author,
  year,
  coverUrl,
}: {
  bookId: number;
  title: string;
  author: string;
  year: number;
  coverUrl: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-card/40 p-3">
      <Link
        href={`/books/${bookId}`}
        className="relative block h-20 w-14 shrink-0 overflow-hidden rounded-md border border-border/60"
      >
        <BookCover src={coverUrl} alt={`Cover of ${title}`} title={title} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/books/${bookId}`}
          className="block truncate font-serif text-lg text-foreground transition-colors hover:text-primary"
        >
          {title}
        </Link>
        <p className="truncate text-sm italic text-muted-foreground">
          {author} · {year}
        </p>
      </div>
      <FavoriteButton bookId={bookId} isFavorite iconSize={18} />
    </div>
  );
}

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Suspense fallback={<AccountSkeleton />}>
        <AccountContent />
      </Suspense>
    </main>
  );
}

/** Reads the session (redirecting to /login if absent), so it streams in. */
async function AccountContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const favorites = getUserFavorites(user.id);
  const reviews = getUserReviews(user.id);

  return (
    <>
      <FadeIn className="mb-10">
        <p className="mb-2 font-serif text-sm uppercase tracking-[0.3em] text-primary/80">
          Your shelf
        </p>
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
          {user.name}
        </h1>
        <p className="mt-1 text-muted-foreground">{user.email}</p>
      </FadeIn>

      <AccountTabs
        favoriteCount={favorites.length}
        reviewCount={reviews.length}
        favorites={
          favorites.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border/60 p-10 text-center">
              <Heart
                size={28}
                className="mx-auto mb-3 text-muted-foreground/50"
              />
              <p className="text-muted-foreground">
                No favourites yet. Wander the archive and claim the books that
                haunt you.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
              >
                Browse the archive
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {favorites.map((f, i) => (
                <FadeIn key={f.bookId} delay={Math.min(i * 0.04, 0.3)}>
                  <FavoriteRow
                    bookId={f.bookId}
                    title={f.title}
                    author={f.author}
                    year={f.year}
                    coverUrl={f.coverUrl}
                  />
                </FadeIn>
              ))}
            </div>
          )
        }
        reviews={
          reviews.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border/60 p-10 text-center">
              <PenLine
                size={28}
                className="mx-auto mb-3 text-muted-foreground/50"
              />
              <p className="text-muted-foreground">
                You haven&rsquo;t left a review yet. The margins are waiting.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
              >
                Find a book to review
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((r, i) => (
                <FadeIn key={r.id} delay={Math.min(i * 0.04, 0.3)}>
                  <article className="rounded-lg border border-border/60 bg-card/40 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/books/${r.bookId}`}
                          className="block truncate font-serif text-lg text-foreground transition-colors hover:text-primary"
                        >
                          {r.title}
                        </Link>
                        <p className="truncate text-sm italic text-muted-foreground">
                          {r.author}
                        </p>
                        <div className="mt-1.5">
                          <StarRating value={r.rating} size={13} />
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <a
                          href={`/books/${r.bookId}`}
                          className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          Edit
                        </a>
                        <ReviewDeleteButton reviewId={r.id} />
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
                      {r.text}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          )
        }
      />
    </>
  );
}

function AccountSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 space-y-3">
        <div className="h-4 w-32 rounded bg-secondary/60" />
        <div className="h-9 w-56 rounded bg-secondary/60" />
        <div className="h-4 w-40 rounded bg-secondary/40" />
      </div>
      <div className="h-72 rounded-lg border border-border/60 bg-card/40" />
    </div>
  );
}
