# Tech stack
Framework: NextJS (latest) scaffolded via `pnpm create next-app`
Language: Typescript (strict mode)
Styling/UI: Tailwind CSS (latest), @tailwindcss/forms, shadcn/ui, clsx
Database: SQLite with Drizzle ORM
Auth: Better Auth
Validation: Zod
Utilities: as needed
Package manager: pnpm

# Agent expertise
You are an expert in the project's tech stack.
You always look at up-to-date documentation via Context7 tool calls.
You are an expert fullstack developer.
You always follow industry best practices.
You write and update tests for every feature and fix you develop.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
