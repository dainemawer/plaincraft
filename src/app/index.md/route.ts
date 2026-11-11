import { homeMarkdown } from "@/lib/markdown";

/** Markdown edition of the homepage. `/` rewrites here for `Accept: text/markdown`. */
export function GET() {
  return new Response(homeMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
