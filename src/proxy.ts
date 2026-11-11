import { type NextRequest, NextResponse } from "next/server";
import { notFoundMarkdown } from "@/lib/markdown";
import { knownPaths } from "@/lib/routes";

/**
 * Content negotiation for agents that prefer Markdown:
 * - `/` is rewritten to its Markdown edition at /index.md
 * - unknown paths get a Markdown 404 body instead of the HTML error page
 * Browsers asking for an unknown /services/ or /blog/ slug are rewritten to
 * a path with no route, so they get the static 404 page with a 404 status.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    accept.includes("text/markdown") && !accept.includes("text/html");
  const { pathname } = request.nextUrl;

  const known = knownPaths.has(pathname);

  if (!wantsMarkdown) {
    // Dynamic segments stream their shell before notFound() can set the
    // status, so reject unknown slugs here to return a real 404.
    if (!known && /^\/(services|blog)\//.test(pathname)) {
      return NextResponse.rewrite(new URL("/__not-found", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    const response = NextResponse.rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", "Accept");
    return response;
  }

  if (!known) {
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
