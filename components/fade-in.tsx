import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TagName = "div" | "li" | "section" | "article";

const tags = {
  div: "div",
  li: "li",
  section: "section",
  article: "article",
} as const;

/**
 * A delicate fade-up entrance, done in pure CSS so it works even if client
 * JavaScript never loads or hydration fails (e.g. on a phone over the LAN).
 * Respects the user's reduced-motion setting via a media query in globals.css.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: TagName;
}) {
  const Tag = tags[as];
  return (
    <Tag
      className={cn("fade-in", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
