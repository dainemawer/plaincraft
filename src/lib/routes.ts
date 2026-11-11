import type { MetadataRoute } from "next";

type Page = {
  path: `/${string}`;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

/** Every HTML page on the site. Drives the sitemap and the agent 404 check. */
export const pages: Page[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

/** Generated metadata routes that have no file extension in their URL. */
const generatedRoutes = ["/apple-icon", "/opengraph-image"];

export const knownPaths = new Set<string>([
  ...pages.map((page) => page.path),
  ...generatedRoutes,
]);

export const lastModified = "2026-11-11";
