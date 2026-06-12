import type { Metadata } from "next";

/** Page title segment; root layout template appends the brand name. */
export function createPageMetadata(title: string, description?: string): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
  };
}
