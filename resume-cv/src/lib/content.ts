import { head, put } from "@vercel/blob";
import { DEFAULT_CONTENT } from "./default-content";
import type { Content } from "./types";

const BLOB_PATH = "content/resume.json";

export async function getContent(): Promise<Content> {
  try {
    const info = await head(BLOB_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`blob fetch failed: ${res.status}`);
    return (await res.json()) as Content;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: Content): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
