import { type NextRequest, NextResponse } from "next/server";
import { notFoundMarkdown } from "@/lib/markdown";
import { knownPaths } from "@/lib/routes";

/**
 * Content negotiation for agents that prefer Markdown:
 * - `/` is rewritten to its Markdown edition at /index.md
 * - unknown paths get a Markdown 404 body instead of the HTML error page
 * Every other request passes through untouched.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    accept.includes("text/markdown") && !accept.includes("text/html");
  const { pathname } = request.nextUrl;

  if (!wantsMarkdown) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const response = NextResponse.rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", "Accept");
    return response;
  }

  if (!knownPaths.has(pathname)) {
    return new NextResponse(notFoundMarkdown(pathname), {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "no-store",
        Vary: "Accept",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Pages only: skip Next.js internals and anything with a file extension
  // (llms.txt, index.md, robots.txt, sitemap.xml, images, fonts).
  matcher: "/((?!_next/|.*\\.).*)",
};
