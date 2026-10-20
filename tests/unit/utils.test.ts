import { describe, expect, it } from "vitest";

import { cn, normalizeEntityId } from "@/lib/utils";

describe("normalizeEntityId", () => {
  it("accepts positive integers", () => {
    expect(normalizeEntityId(1)).toBe(1);
    expect(normalizeEntityId(42)).toBe(42);
  });

  it("accepts numeric strings", () => {
    expect(normalizeEntityId("7")).toBe(7);
    expect(normalizeEntityId(" 12 ")).toBe(12);
  });

  it("rejects zero, negatives and non-integers", () => {
    expect(normalizeEntityId(0)).toBeNull();
    expect(normalizeEntityId(-3)).toBeNull();
    expect(normalizeEntityId(2.5)).toBeNull();
  });

  it("rejects non-numeric input", () => {
    expect(normalizeEntityId("abc")).toBeNull();
    expect(normalizeEntityId("")).toBeNull();
    expect(normalizeEntityId(null)).toBeNull();
    expect(normalizeEntityId(undefined)).toBeNull();
    expect(normalizeEntityId(NaN)).toBeNull();
    expect(normalizeEntityId(Infinity)).toBeNull();
    expect(normalizeEntityId({ id: 1 })).toBeNull();
  });
});

describe("cn", () => {
  it("joins class names and drops falsy ones", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("merges conflicting tailwind classes (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
