# Gothique

A gothic book archive — one hundred classics of the dark imagination, drawn from
[Project Gutenberg](https://www.gutenberg.org), kept in shadow, and waiting for your
mark. Favourite the books that haunt you, and leave a review for the ones that
won't let you sleep.

Styled as a dimly lit vintage bookstore: a dark, candlelit palette, serif
lettering, and delicate, evocative motion.

## Features

- **The Archive** — a browsable grid of 100 pre-seeded gothic classics with
  cover art, author, year, and community rating.
- **Book pages** — cover, description, rating, a link to read on Project
  Gutenberg, and the reading room (reviews).
- **Accounts** — sign up and sign in with email & password (Better Auth).
- **Favourites** — mark the books that haunt you; manage them from your shelf.
- **Reviews** — leave a public 1–5 star review with text; edit or remove your
  own. One review per person per book.

## Tech stack

| Concern      | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) |
| Language     | TypeScript (strict)                                 |
| Styling      | [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) |
| Animation    | [Framer Motion](https://www.framer.com/motion/)      |
| Database     | SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) + [Drizzle ORM](https://orm.drizzle.team) |
| Auth         | [Better Auth](https://better-auth.com) (email/password, sessions) |
| Validation   | [Zod](https://zod.dev)                              |
| Lint/Format  | [Biome](https://biomejs.dev)                        |
| Tests        | [Vitest](https://vitest.dev) (unit/integration) + [Playwright](https://playwright.dev) (E2E smoke) |

## Getting started

Requires [Node.js](https://nodejs.org) 20+ and [pnpm](https://pnpm.io).

```bash
# 1. Install dependencies
pnpm install

# 2. Create your environment file and set a secret
cp .env.example .env
#    -> generate a secret:  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Create the database schema (SQLite file at data/gothique.db)
pnpm db:push

# 4. Seed the 100 books
pnpm db:seed

# 5. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script             | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `pnpm dev`         | Start the dev server (Turbopack)                |
| `pnpm build`       | Production build                                |
| `pnpm start`       | Serve the production build                      |
| `pnpm db:push`     | Push the Drizzle schema to SQLite               |
| `pnpm db:seed`     | Seed the 100 books (idempotent)                 |
| `pnpm db:studio`   | Open Drizzle Studio (DB browser)                |
| `pnpm test`        | Run unit/integration tests (Vitest)             |
| `pnpm test:watch`  | Run tests in watch mode                         |
| `pnpm test:e2e`    | Run the browser E2E smoke test (needs `pnpm dev` running) |
| `pnpm lint`        | Lint + type-check formatting (Biome)            |
| `pnpm format`      | Auto-format (Biome)                             |

## Project structure

```
app/
  page.tsx              # The Archive (home)
  books/[id]/page.tsx   # Book detail + reading room
  login/ register/      # Auth pages
  account/page.tsx      # My Shelf (favourites + reviews)
  api/auth/[...all]/    # Better Auth route handler
components/             # Feature components (cards, forms, header, …)
  ui/                   # shadcn/ui primitives
lib/
  auth.ts               # Better Auth server config
  auth-client.ts        # Better Auth client (useSession, etc.)
  session.ts            # getCurrentUser() — session read (use cache: private)
  actions.ts            # Server Actions (favourites, reviews)
  queries.ts            # Read queries (books, reviews, favourites)
  schemas.ts            # Shared Zod validation
  db/                   # Drizzle schema, connection, seed data + script
test/                   # Vitest suites + in-memory DB helper
scripts/e2e-smoke.mjs   # Playwright end-to-end smoke test
scripts/visual-test.mjs # Visual regression tests over Storybook stories
```

## Notes

- **Cache Components & streaming.** With `cacheComponents` enabled, the static
  shell of each page prerenders instantly; session-dependent UI (the user menu,
  favourite state, review form) streams in behind `<Suspense>` boundaries. The
  session read uses `use cache: private` so per-session navigations stay instant.
- **Covers.** Cover images are served from Project Gutenberg; `BookCover` falls
  back to an embossed initial if an image is missing.
- **The database file** (`data/`) and `.env` are gitignored.
- **Visual regression tests.** Stories live next to their components
  (`components/**/*.stories.tsx`) and are screenshotted by
  `scripts/visual-test.mjs`. Baselines are stored in
  `test/visual/__screenshots__/`.

  ```sh
  pnpm run visual:test     # compare against baselines (CI mode)
  pnpm run visual:update   # re-record baselines after intentional changes
  pnpm run visual:test -- --filter star-rating   # run a subset
  ```

  Stories must be deterministic: no dates, randomness, or remote images.
  Animations are frozen by the harness; keep new stories static or they will
  produce flaky diffs.
