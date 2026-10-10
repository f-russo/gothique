import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

/** The slice of the user we expose to the UI. */
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

/**
 * Read the current user from the session.
 *
 * `use cache: private` lets this read `headers()` while keeping the result in
 * the browser only (never on the server), so per-session navigations are
 * instant. It must sit behind a <Suspense> boundary — see the pages that call it.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  "use cache: private";
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) return null;
  const u = session.user;
  return { id: u.id, name: u.name, email: u.email, image: u.image ?? null };
}
