"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useTransition } from "react";

import { toggleFavorite } from "@/lib/actions";
import { cn } from "@/lib/utils";

/**
 * A heart that toggles a book favourite. Optimistic, with a little pulse.
 */
export function FavoriteButton({
  bookId,
  isFavorite,
  iconSize = 18,
  className,
}: {
  bookId: number;
  isFavorite: boolean;
  iconSize?: number;
  className?: string;
}) {
  const [fav, setFav] = useState(isFavorite);
  const [pending, startTransition] = useTransition();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !fav;
    setFav(next);
    startTransition(async () => {
      const res = await toggleFavorite(null, bookId);
      if (!res.ok) setFav(!next);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={fav}
      aria-label={fav ? "Remove from favourites" : "Add to favourites"}
      title={fav ? "Remove from favourites" : "Add to favourites"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
        className,
      )}
    >
      <motion.span
        animate={fav ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex"
      >
        <Heart
          size={iconSize}
          strokeWidth={1.75}
          className={cn(
            "transition-colors duration-300",
            fav
              ? "fill-accent text-accent drop-shadow-[0_0_8px_oklch(0.5_0.17_26/50%)]"
              : "text-foreground/75",
          )}
        />
      </motion.span>
    </button>
  );
}
