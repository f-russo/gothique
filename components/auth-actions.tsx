import Link from "next/link";

import { getCurrentUser } from "@/lib/session";

import { UserMenu } from "./user-menu";

/**
 * The right-hand side of the header. Reads the session, so it must render
 * behind a <Suspense> boundary (see Header).
 */
export async function AuthActions() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
        >
          Join
        </Link>
      </>
    );
  }

  return (
    <UserMenu
      name={user.name}
      email={user.email}
      image={user.image ?? undefined}
    />
  );
}
