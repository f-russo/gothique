"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
} as const;

type TagName = keyof typeof tags;

/**
 * A delicate fade-up entrance that respects the user's reduced-motion setting.
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
  const reduce = useReducedMotion();
  const MotionTag = tags[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
