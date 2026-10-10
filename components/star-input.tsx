"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const LABELS = ["", "Dreadful", "Poor", "Fair", "Good", "Haunting"];

/**
 * An interactive 1–5 star picker with a hover preview and a gothic label.
 */
export function StarInput({
  value,
  onChange,
  name = "rating",
}: {
  value: number;
  onChange: (value: number) => void;
  name?: string;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex items-center gap-3">
      <fieldset
        className="m-0 flex min-w-0 items-center gap-1 border-0 p-0"
        aria-label="Rating"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={value === i}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(i)}
            className="rounded-sm p-0.5 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Star
              size={26}
              strokeWidth={1.5}
              className={cn(
                "transition-colors duration-200",
                i <= active
                  ? "fill-primary text-primary drop-shadow-[0_0_6px_oklch(0.74_0.09_78/45%)]"
                  : "text-muted-foreground/30",
              )}
            />
          </button>
        ))}
      </fieldset>
      <span className="min-w-20 text-sm italic text-muted-foreground">
        {active ? LABELS[active] : "Choose…"}
      </span>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
