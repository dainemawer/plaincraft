import { type NextRequest, NextResponse } from "next/server";

/**
 * Content negotiation for agents: a request for `/` that prefers Markdown
 * gets the Markdown edition. Both representations vary on Accept so shared
 * caches never mix them up.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    accept.includes("text/markdown") && !accept.includes("text/html");

  const response = wantsMarkdown
    ? NextResponse.rewrite(new URL("/index.md", request.url))
    : NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: "/",
};
