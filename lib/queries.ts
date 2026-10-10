import "server-only";

import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "./db";
import { user } from "./db/auth-schema";
import { books, favorites, reviews } from "./db/schema";

/** A book joined with its community rating aggregate. */
export type BookWithRating = {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  coverUrl: string;
  gutenbergId: number;
  gutenbergUrl: string;
  avgRating: number | null;
  reviewCount: number;
};

/** All books, newest rating activity first is not tracked — so by title. */
export function listBooks(): BookWithRating[] {
  return db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      year: books.year,
      description: books.description,
      coverUrl: books.coverUrl,
      gutenbergId: books.gutenbergId,
      gutenbergUrl: books.gutenbergUrl,
      avgRating: sql<number | null>`avg(${reviews.rating})`,
      reviewCount: sql<number>`count(${reviews.id})`,
    })
    .from(books)
    .leftJoin(reviews, eq(books.id, reviews.bookId))
    .groupBy(books.id)
    .orderBy(desc(sql`count(${reviews.id})`), books.title)
    .all();
}

export function getBook(id: number): BookWithRating | undefined {
  return db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      year: books.year,
      description: books.description,
      coverUrl: books.coverUrl,
      gutenbergId: books.gutenbergId,
      gutenbergUrl: books.gutenbergUrl,
      avgRating: sql<number | null>`avg(${reviews.rating})`,
      reviewCount: sql<number>`count(${reviews.id})`,
    })
    .from(books)
    .leftJoin(reviews, eq(books.id, reviews.bookId))
    .where(eq(books.id, id))
    .groupBy(books.id)
    .get();
}

export type ReviewWithAuthor = {
  id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  authorName: string;
};

export function getReviewsForBook(bookId: number): ReviewWithAuthor[] {
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      text: reviews.text,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      userId: reviews.userId,
      authorName: user.name,
    })
    .from(reviews)
    .innerJoin(user, eq(reviews.userId, user.id))
    .where(eq(reviews.bookId, bookId))
    .orderBy(desc(reviews.createdAt))
    .all();
}

export function getReviewByUserAndBook(
  userId: string,
  bookId: number,
): ReviewWithAuthor | undefined {
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      text: reviews.text,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      userId: reviews.userId,
      authorName: user.name,
    })
    .from(reviews)
    .innerJoin(user, eq(reviews.userId, user.id))
    .where(and(eq(reviews.userId, userId), eq(reviews.bookId, bookId)))
    .get();
}

/** Set of book ids the user has favourited. */
export function getFavoriteBookIds(userId: string): Set<number> {
  const rows = db
    .select({ bookId: favorites.bookId })
    .from(favorites)
    .where(eq(favorites.userId, userId))
    .all();
  return new Set(rows.map((r) => r.bookId));
}

export type FavoriteWithBook = {
  bookId: number;
  createdAt: Date;
  title: string;
  author: string;
  year: number;
  coverUrl: string;
};

export function getUserFavorites(userId: string): FavoriteWithBook[] {
  return db
    .select({
      bookId: favorites.bookId,
      createdAt: favorites.createdAt,
      title: books.title,
      author: books.author,
      year: books.year,
      coverUrl: books.coverUrl,
    })
    .from(favorites)
    .innerJoin(books, eq(favorites.bookId, books.id))
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.createdAt))
    .all();
}

export type UserReview = {
  id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
};

export function getUserReviews(userId: string): UserReview[] {
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      text: reviews.text,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      bookId: reviews.bookId,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
    })
    .from(reviews)
    .innerJoin(books, eq(reviews.bookId, books.id))
    .where(eq(reviews.userId, userId))
    .orderBy(desc(reviews.createdAt))
    .all();
}
