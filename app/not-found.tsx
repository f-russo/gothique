import { Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <Ghost
        size={48}
        className="mb-6 text-muted-foreground/50 animate-flicker"
      />
      <h1 className="font-serif text-4xl text-foreground">
        This page has vanished
      </h1>
      <p className="mt-3 text-muted-foreground">
        Like a good ghost story, it&rsquo;s gone before you could grasp it.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
      >
        Return to the archive
      </Link>
    </main>
  );
}
