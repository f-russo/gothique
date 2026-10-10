import { ExternalLink, Heart, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookCover } from "@/components/book-cover";
import { FadeIn } from "@/components/fade-in";
import { FavoriteButton } from "@/components/favorite-button";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/review-form";
import { StarRating } from "@/components/star-rating";
import {
  getBook,
  getFavoriteBookIds,
  getReviewByUserAndBook,
  getReviewsForBook,
} from "@/lib/queries";
import { getCurrentUser } from "@/lib/session";

type BookPageProps = { params: Promise<{ id: string }> };

export default function BookPage({ params }: BookPageProps) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to the archive
      </Link>

      <Suspense fallback={<BookSkeleton />}>
        <BookContent params={params} />
      </Suspense>
    </main>
  );
}

/**
 * Resolves the book from the (dynamic) id, so it streams in behind the
 * boundary — the back link above prerenders into the static shell.
 */
async function BookContent({ params }: BookPageProps) {
  const { id } = await params;
  const bookId = Number(id);
  if (!Number.isInteger(bookId) || bookId <= 0) notFound();

  const book = getBook(bookId);
  if (!book) notFound();

  const reviews = getReviewsForBook(bookId);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-10">
        {/* Cover */}
        <FadeIn>
          <div className="relative mx-auto aspect-[2/3] w-52 overflow-hidden rounded-lg border border-border/60 shadow-[0_24px_60px_-24px_oklch(0_0_0/90%)] sm:w-60 md:mx-0 md:w-full">
            <BookCover
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              title={book.title}
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </FadeIn>

        {/* Details */}
        <FadeIn delay={0.08} className="flex flex-col">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                {book.title}
              </h1>
              <p className="font-serif text-lg italic text-muted-foreground">
                {book.author} · {book.year}
              </p>
            </div>
            <FavoriteSlot bookId={book.id} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            {book.reviewCount > 0 ? (
              <>
                <StarRating value={book.avgRating ?? 0} size={18} />
                <span className="text-sm text-muted-foreground">
                  {book.avgRating?.toFixed(1)} · {book.reviewCount}{" "}
                  {book.reviewCount === 1 ? "review" : "reviews"}
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm italic text-muted-foreground/70">
                <Star size={14} /> No reviews yet — be the first
              </span>
            )}
          </div>

          <p className="mt-6 text-[17px] leading-relaxed text-foreground/90">
            {book.description}
          </p>

          <a
            href={book.gutenbergUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
          >
            <ExternalLink size={15} />
            Read on Project Gutenberg
          </a>
        </FadeIn>
      </div>

      {/* Reviews */}
      <section id="review-form" className="mt-14 scroll-mt-24">
        <h2 className="mb-5 flex items-center gap-2 font-serif text-2xl text-foreground">
          <Heart size={20} className="text-accent" />
          Reviews from the reading room
        </h2>

        <Suspense fallback={<ReviewsSkeleton />}>
          <ReviewsSection bookId={book.id} reviews={reviews} />
        </Suspense>
      </section>
    </>
  );
}

/** The favourite heart needs the session to know its state, so it streams in. */
function FavoriteSlot({ bookId }: { bookId: number }) {
  return (
    <Suspense
      fallback={
        <div className="size-11 shrink-0 animate-pulse rounded-full bg-secondary/60" />
      }
    >
      <FavoriteInner bookId={bookId} />
    </Suspense>
  );
}

async function FavoriteInner({ bookId }: { bookId: number }) {
  const user = await getCurrentUser();
  const isFavorite = user ? getFavoriteBookIds(user.id).has(bookId) : false;
  return (
    <FavoriteButton
      bookId={bookId}
      isFavorite={isFavorite}
      iconSize={22}
      className="size-11 shrink-0"
    />
  );
}

/** The review form + list depend on the session (create vs. edit, own-review). */
async function ReviewsSection({
  bookId,
  reviews,
}: {
  bookId: number;
  reviews: ReturnType<typeof getReviewsForBook>;
}) {
  const user = await getCurrentUser();
  const myReview = user ? getReviewByUserAndBook(user.id, bookId) : undefined;

  return (
    <>
      {user ? (
        <ReviewForm
          bookId={bookId}
          existing={myReview}
          signedIn={Boolean(user)}
        />
      ) : (
        <div className="mb-6 rounded-lg border border-border/60 bg-card/40 p-5 text-center">
          <p className="text-muted-foreground">
            Sign in to leave your mark in the margin.
          </p>
          <div className="mt-3 flex justify-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-4 py-2 text-sm text-foreground transition-colors hover:text-primary"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              Create an account
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p className="text-sm italic text-muted-foreground/70">
            The margins are still blank.
          </p>
        ) : (
          reviews.map((r, i) => (
            <FadeIn key={r.id} delay={Math.min(i * 0.04, 0.3)}>
              <ReviewCard review={r} isOwn={user?.id === r.userId} />
            </FadeIn>
          ))
        )}
      </div>
    </>
  );
}

function BookSkeleton() {
  return (
    <div className="grid animate-pulse gap-8 md:grid-cols-[240px_1fr] md:gap-10">
      <div className="mx-auto aspect-[2/3] w-52 rounded-lg bg-secondary/50 sm:w-60 md:mx-0 md:w-full" />
      <div className="space-y-4">
        <div className="h-10 w-2/3 rounded bg-secondary/60" />
        <div className="h-5 w-1/3 rounded bg-secondary/40" />
        <div className="h-4 w-1/2 rounded bg-secondary/40" />
        <div className="mt-6 space-y-2">
          <div className="h-4 w-full rounded bg-secondary/40" />
          <div className="h-4 w-5/6 rounded bg-secondary/40" />
          <div className="h-4 w-4/6 rounded bg-secondary/40" />
        </div>
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4">
      <div className="h-40 rounded-lg border border-border/60 bg-card/40" />
      <div className="h-24 rounded-lg border border-border/60 bg-card/40" />
    </div>
  );
}
