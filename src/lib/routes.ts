import type { MetadataRoute } from "next";
import {
  activeCategories,
  articlePath,
  categoryPath,
  isCategoryIndexable,
  publishedArticles,
} from "@/content/articles";
import { serviceDetails, servicePath } from "@/content/services";

type Page = {
  path: `/${string}`;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
  /** ISO date; defaults to the site-wide `lastModified`. */
  lastModified?: string;
};

/** Every HTML page on the site. Drives the sitemap and the agent 404 check. */
export const pages: Page[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  ...serviceDetails.map((detail) => ({
    path: servicePath(detail),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  {
    path: "/pricing",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-11-13",
  },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  ...publishedArticles.map((article) => ({
    path: articlePath(article),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: article.updated ?? article.date,
  })),
  ...activeCategories.filter(isCategoryIndexable).map((category) => ({
    path: categoryPath(category),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  })),
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

/** Generated metadata routes that have no file extension in their URL. */
const generatedRoutes = ["/apple-icon", "/opengraph-image"];

export const knownPaths = new Set<string>([
  ...pages.map((page) => page.path),
  // Topic pages exist (noindex) before they have enough articles for the sitemap.
  ...activeCategories.map(categoryPath),
  ...generatedRoutes,
  // Newsletter confirmation steps: real pages, but noindex and not in the sitemap.
  "/newsletter/confirmed",
  "/newsletter/link-expired",
]);

export const lastModified = "2026-11-11";
