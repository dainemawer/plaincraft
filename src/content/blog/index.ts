import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { MDXContent } from "mdx/types";
import { slugify } from "@/lib/slug";

type Body = () => Promise<{ default: MDXContent }>;

/** Article bodies, by slug. Each slug must match an entry in src/content/articles.ts. */
export const articleBodies: Record<string, Body> = {
  "what-ai-can-do-for-a-small-business": () =>
    import("./what-ai-can-do-for-a-small-business.mdx"),
  "unused-chatgpt-licences": () => import("./unused-chatgpt-licences.mdx"),
  "popia-ai-tools-checklist": () => import("./popia-ai-tools-checklist.mdx"),
  "automating-quotes": () => import("./automating-quotes.mdx"),
  "ai-vendor-questions": () => import("./ai-vendor-questions.mdx"),
  "where-ai-shouldnt-go": () => import("./where-ai-shouldnt-go.mdx"),
  "ai-usage-policy": () => import("./ai-usage-policy.mdx"),
  "invoice-capture": () => import("./invoice-capture.mdx"),
};

/** Raw MDX source. Read at build time, when every article is prerendered. */
export const articleSource = (slug: string) =>
  readFileSync(
    join(process.cwd(), "src", "content", "blog", `${slug}.mdx`),
    "utf8",
  );

/** "On this page" entries: every level-two Markdown heading, in order. */
export function articleToc(source: string) {
  return [...source.matchAll(/^## (.+)$/gm)].map((match) => {
    const label = match[1].trim();
    return { id: slugify(label), label };
  });
}
