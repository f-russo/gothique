import { cn } from "cn";

export { cn };

/**
 * Coerce an untrusted value (query param, form field, action argument) into a
 * positive integer id, or null when it isn't one.
 */
export function normalizeEntityId(value: unknown): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
