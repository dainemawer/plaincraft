import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-11-11",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: "2026-11-11",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: "2026-11-11",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
