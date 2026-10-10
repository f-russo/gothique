import { createAuthClient } from "better-auth/react";

/**
 * Client-side Better Auth (React flavour, so `useSession()` is available).
 *
 * No baseURL needed in the browser — it defaults to the current origin, which
 * matches the `/api/auth` route handler.
 */
export const authClient = createAuthClient();

export type ClientSession = NonNullable<
  Awaited<ReturnType<typeof authClient.getSession>>
>;
