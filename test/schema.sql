-- Schema fixture for tests. Mirrors lib/db/auth-schema.ts + lib/db/schema.ts.
-- Regenerate with: pnpm db:push (inspect the emitted SQL) if the schema changes.

CREATE TABLE `user` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `email_verified` integer DEFAULT false NOT NULL,
  `image` text,
  `created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  `updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);

CREATE TABLE `book` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `title` text NOT NULL,
  `author` text NOT NULL,
  `year` integer NOT NULL,
  `description` text NOT NULL,
  `cover_url` text NOT NULL,
  `gutenberg_id` integer NOT NULL,
  `gutenberg_url` text NOT NULL,
  `created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
CREATE UNIQUE INDEX `book_gutenberg_id_unique` ON `book` (`gutenberg_id`);

CREATE TABLE `favorite` (
  `user_id` text NOT NULL,
  `book_id` integer NOT NULL,
  `created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX `favorite_user_book_idx` ON `favorite` (`user_id`,`book_id`);
CREATE INDEX `favorite_book_idx` ON `favorite` (`book_id`);

CREATE TABLE `review` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` text NOT NULL,
  `book_id` integer NOT NULL,
  `rating` integer NOT NULL,
  `text` text NOT NULL,
  `created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
  `updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX `review_user_book_idx` ON `review` (`user_id`,`book_id`);
CREATE INDEX `review_book_idx` ON `review` (`book_id`);
