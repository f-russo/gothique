import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A read-only row of 1–5 stars showing an average rating.
 */
export function StarRating({
  value,
  size = 15,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <div
      role="img"
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={cn(
            "transition-colors",
            i <= rounded
              ? "fill-primary text-primary"
              : "text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}
