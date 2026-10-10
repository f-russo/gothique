export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="font-serif text-sm text-muted-foreground">
          <span className="text-foreground">Gothique</span> — a dimly lit
          archive of the gothic imagination.
        </p>
        <p className="text-xs text-muted-foreground/70">
          Book metadata courtesy of{" "}
          <a
            href="https://www.gutenberg.org"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground"
          >
            Project Gutenberg
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
