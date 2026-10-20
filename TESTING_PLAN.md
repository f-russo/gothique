# Testing Plan — gothique

A three-step plan to add testing to the project: **unit tests** for logic,
**integration tests** for API routes, and **E2E tests** for user journeys.

> Stack: Next.js (latest) · TypeScript strict · Drizzle + SQLite · Better Auth · Zod · pnpm

---

## Step 1 — Unit tests (Vitest)

**Goal:** test the pure logic extracted from routes and pages — not the routes themselves.

### 1.1 Setup
- [x] Install: `pnpm add -D vitest @vitest/coverage-v8`
- [x] Create `vitest.config.ts`:
  - `environment: 'node'`
  - `include: ['tests/unit/**/*.test.ts']`
  - Path aliases matching `tsconfig.json` (e.g. `@/*`)
- [x] Add scripts to `package.json`:
  - `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`

### 1.2 What to test
- [x] **Zod schemas** — validation rules, boundary values, invalid payloads
  (extract shared schemas into e.g. `lib/validations/` if not already)
- [x] **Server actions / data helpers** — permission checks, query builders,
  data transformation logic used by `app/books/[id]`, `app/account`, etc.
  (extract into `lib/` / `services/` so they're importable without React)
- [x] **Pure utilities** — formatting, slugification, date handling, etc.

### 1.3 What NOT to test
- ❌ Route handlers with heavy mocking of `NextRequest` / `cookies()` → belongs in Step 2
- ❌ Page components' rendering → belongs in Step 3
- ❌ Config files, `layout.tsx` glue code

### 1.4 Rules
- No DB, no network, no file I/O in unit tests — mock at the module boundary only
- Aim for meaningful assertions, not coverage theater
- Every bug fix gets a regression test first

---

## Step 2 — Integration tests (Vitest + real SQLite)

**Goal:** test API routes end-to-end at the HTTP level: real `Request` in,
real DB side effects, real status codes out.

### 2.1 Setup
- [ ] Install (if needed): `pnpm add -D better-sqlite3` (dev/test driver)
- [ ] Create `tests/integration/` with a shared **test harness** (`tests/integration/harness.ts`):
  - In-memory SQLite (`:memory:`) or temp-file DB
  - Drizzle migrations applied once per test file
  - Helper to build `new Request(url, { method, body, headers })` and invoke
    route handlers directly (`GET`/`POST` exports from `app/api/**/route.ts`)
  - Cookie/session helpers for authenticated requests
- [ ] Vitest projects (or separate config): `tests/integration/**/*.test.ts`

### 2.2 What to test
- [ ] `app/api/auth/[...all]/route.ts` (Better Auth):
  - ⚠️ Better Auth manipulates cookies/headers heavily — if direct handler
    invocation is impractical, spin up the real app on a random port and hit
    it with `fetch` (still fast, still integration-level)
  - Sign-up, sign-in, sign-out, session validation, invalid credentials
- [ ] Future API routes:
  - Happy path + validation errors (422/400) + auth errors (401/403) + not found (404)
  - DB side effects asserted via Drizzle queries after the call

### 2.3 Rules
- Fresh DB state per test (truncate or recreate) — no test-order dependencies
- Assert on status code **and** response body **and** DB state
- Keep each test self-contained: arrange → act → assert

---

## Step 3 — E2E tests (Playwright)

**Goal:** verify critical user journeys through the real app in a real browser.

### 3.1 Setup
- [ ] Install: `pnpm add -D @playwright/test` + `pnpm exec playwright install chromium`
- [ ] Create `playwright.config.ts`:
  - `webServer`: run `pnpm build && pnpm start` (or `next dev`) on a random port
  - Test against a **dedicated test database** (never the dev DB)
  - Base URL from config, traces/screenshots on failure
- [ ] Add scripts: `"test:e2e": "playwright test"`

### 3.2 Journeys to test (golden paths only)
- [ ] **Auth flow:** register → auto-login/redirect → sign out → sign in
- [ ] **Books:** view book detail (`/books/[id]`) → navigation from home
- [ ] **Account:** log in → update account (`/account`) → verify change persists after reload
- [ ] **Negative checks (minimal):** wrong password shows error; unauthenticated
  access to protected page redirects to `/login`

### 3.3 What NOT to test
- ❌ Every visual permutation or responsive breakpoint
- ❌ Flows covered by integration tests at the API level
- ❌ Styling details (use screenshots/manual QA for that)

### 3.4 Rules
- Keep the suite small: E2E is slow and flake-prone
- Seed test data via API calls or a seed script, not UI clicks where possible
- Run E2E in CI on PRs; unit + integration on every push

---

## CI summary

| Level | Tool | Location | Trigger |
|---|---|---|---|
| Unit | Vitest | `tests/unit/` | every push / pre-commit |
| Integration | Vitest + SQLite | `tests/integration/` | every push |
| E2E | Playwright | `tests/e2e/` | PRs + main |

**Suggested directory layout:**
```
tests/
  unit/
  integration/
    harness.ts
  e2e/
```

---

## Order of execution

1. **Step 1 first** — cheapest, fastest feedback, establishes test habits
2. **Step 2 next** — highest value for this codebase (auth + API correctness)
3. **Step 3 last** — once the golden paths are stable
