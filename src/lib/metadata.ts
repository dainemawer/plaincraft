import type { Metadata } from "next";
import { site } from "./site";

type PageMetadataInput = {
  /** Page title. Pass `{ absolute }` to bypass the "%s | Plaincraft" template. */
  title: string | { absolute: string };
  description: string;
  /** Root-relative path of the page, used for canonical and og:url. */
  path: `/${string}`;
  /** Optional shorter title for social cards. */
  socialTitle?: string;
  socialDescription?: string;
  /** Root-relative path of a Markdown edition of the page, if there is one. */
  markdown?: `/${string}`;
  /** Social card image, if the page has its own. Defaults to the site card. */
  image?: { url: string; width: number; height: number; alt: string };
  /** Marks the page as an article for Open Graph. */
  article?: { publishedTime: string; modifiedTime?: string; section: string };
};

/**
 * Per-page metadata. Next.js shallow-merges metadata objects, so every page
 * sets its own canonical URL and a complete Open Graph block.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
  markdown,
  image,
  article,
}: PageMetadataInput): Metadata {
  const plainTitle = typeof title === "string" ? title : title.absolute;
  const ogTitle = socialTitle ?? plainTitle;
  const ogDescription = socialDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { [site.locale]: path },
      ...(markdown ? { types: { "text/markdown": markdown } } : {}),
    },
    openGraph: {
      siteName: site.name,
      locale: site.ogLocale,
      url: path,
      title: ogTitle,
      description: ogDescription,
      ...(image ? { images: [image] } : {}),
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            section: article.section,
            authors: [site.founder.url],
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
