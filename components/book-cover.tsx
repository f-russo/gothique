"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A book cover with a graceful fallback: if the Gutenberg image is missing or
 * fails to load, we show an embossed initial on a dark leather panel.
 */
export function BookCover({
  src,
  alt,
  title,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
  /** Set for above-the-fold covers (e.g. the book detail hero) to load eagerly. */
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const initial = title.trim().charAt(0).toUpperCase() || "G";

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-secondary to-background",
          className,
        )}
      >
        <span className="font-serif text-6xl text-primary/40 select-none">
          {initial}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
      className={cn("object-cover", className)}
      style={{ filter: "sepia(0.18) contrast(1.02) brightness(0.92)" }}
      onError={() => setFailed(true)}
    />
  );
}
