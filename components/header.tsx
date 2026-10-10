import { BookMarked } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { AuthActions } from "./auth-actions";

function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 focus-visible:outline-none"
    >
      <span className="relative flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
        <BookMarked
          size={19}
          strokeWidth={1.5}
          className="text-primary animate-flicker"
        />
      </span>
      <span className="font-serif text-2xl font-semibold tracking-wide text-foreground transition-colors group-hover:text-primary">
        Gothique
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            The Archive
          </Link>
          <Suspense
            fallback={
              <div className="h-9 w-24 animate-pulse rounded-full bg-secondary/60" />
            }
          >
            <AuthActions />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
