/**
 * Blog articles. Metadata lives here so listings, the sitemap, JSON-LD and
 * llms.txt never need to load the article bodies, which are MDX files in
 * src/content/blog/<slug>.mdx.
 *
 * To publish a draft: finish its MDX file, set `draft: false`, update `date`,
 * then deploy and run `pnpm indexnow`.
 */

import type { StaticImageData } from "next/image";
import automatingQuotes from "@/assets/images/blog/automating-quotes.jpg";
import invoiceCapture from "@/assets/images/blog/invoice-capture.jpg";
import popiaChecklist from "@/assets/images/blog/popia-checklist.jpg";
import unusedLicences from "@/assets/images/blog/unused-licences.jpg";
import usagePolicy from "@/assets/images/blog/usage-policy.jpg";
import vendorQuestions from "@/assets/images/blog/vendor-questions.jpg";
import featured from "@/assets/images/blog/what-ai-can-do-featured.jpg";
import header from "@/assets/images/blog/what-ai-can-do-header.jpg";
import whereAiShouldntGo from "@/assets/images/blog/where-ai-shouldnt-go.jpg";

export const categories = [
  "Guides",
  "Automation",
  "Governance",
  "Adoption",
  "Buying",
] as const;

export type Category = (typeof categories)[number];

type Image = { src: StaticImageData; alt: string };

export type Article = {
  slug: string;
  title: string;
  /** Lede under the headline, and the meta description. */
  description: string;
  /** One-line summary for article cards. */
  excerpt: string;
  category: Category;
  tags: string[];
  /** ISO date of publication. */
  date: string;
  /** ISO date of the last meaningful edit, if after publication. */
  updated?: string;
  readMinutes: number;
  /** Card and social image. */
  image: Image;
  /** Wide image under the article header. Falls back to `image`. */
  header?: Image & { caption?: string };
  /** Drafts are left out of every listing, the sitemap and the build. */
  draft: boolean;
};

export const articles: Article[] = [
  {
    slug: "what-ai-can-do-for-a-small-business",
    title: "What AI can actually do for a 20-person business.",
    description:
      "Forget the demos. Here are the three jobs AI does well in a small business, what it costs to try, and a one-week plan to find your first win.",
    excerpt:
      "The three jobs AI does well in a small business, what it costs to try, and a one-week plan to find your first win.",
    category: "Guides",
    tags: ["Getting started"],
    date: "2026-11-10",
    readMinutes: 3,
    image: {
      src: featured,
      alt: "A business owner and three team members gathered around one laptop, one pointing at the screen.",
    },
    header: {
      src: header,
      alt: "A team working through a process diagram on a whiteboard while colleagues watch from a table of laptops.",
      caption: "Start with the work your team already does, not with the tool.",
    },
    draft: false,
  },
  {
    slug: "unused-chatgpt-licences",
    title: "You bought ChatGPT licences. Nobody uses them. Here's why.",
    description:
      "It's rarely the tool. It's that nobody showed the team which of their tasks it's for. How to turn unused AI licences into everyday habits.",
    excerpt:
      "It's rarely the tool. It's that nobody showed the team which of their tasks it's for.",
    category: "Adoption",
    tags: ["Training", "ChatGPT"],
    date: "2026-11-12",
    readMinutes: 3,
    image: {
      src: unusedLicences,
      alt: "A team meeting around a long table with laptops open.",
    },
    draft: false,
  },
  {
    slug: "popia-ai-tools-checklist",
    title: "POPIA and AI tools: a plain-English checklist",
    description:
      "Ten questions to answer before anyone pastes client data into an AI tool. A practical POPIA checklist for South African small businesses.",
    excerpt:
      "Ten questions to answer before anyone pastes client data into an AI tool.",
    category: "Governance",
    tags: ["POPIA", "Data"],
    date: "2026-11-12",
    readMinutes: 3,
    image: {
      src: popiaChecklist,
      alt: "An office filing cabinet with a padlock resting on top.",
    },
    draft: false,
  },
  {
    slug: "automating-quotes",
    title: "Automating quotes, step by step",
    description:
      "How a quote that takes an afternoon becomes a draft in ten minutes, with a person still checking it. A step-by-step guide for small businesses.",
    excerpt:
      "How a quote that takes an afternoon becomes a draft in ten minutes, with a person still checking it.",
    category: "Automation",
    tags: ["Quotes", "Sales admin"],
    date: "2026-11-12",
    readMinutes: 2,
    image: {
      src: automatingQuotes,
      alt: "A laptop showing a quote layout beside a printed draft and a pen.",
    },
    draft: false,
  },
  {
    slug: "ai-vendor-questions",
    title: "Five questions to ask any AI vendor before you sign",
    description:
      "Where does our data go? What happens when we leave? Five simple questions that save small businesses from expensive AI contracts.",
    excerpt:
      "Where does our data go? What happens when we leave? Simple questions that save expensive mistakes.",
    category: "Buying",
    tags: ["Vendors", "Contracts"],
    date: "2026-11-12",
    readMinutes: 2,
    image: {
      src: vendorQuestions,
      alt: "Two people shaking hands across a desk above a printed contract.",
    },
    draft: false,
  },
  {
    slug: "where-ai-shouldnt-go",
    title: "Where AI shouldn't go in your business",
    description:
      "Judgement, accountability and relationships. The jobs to keep firmly human in a small business, and why.",
    excerpt:
      "Judgement, accountability and relationships. The jobs to keep firmly human, and why.",
    category: "Guides",
    tags: ["Getting started"],
    date: "2026-11-12",
    readMinutes: 2,
    image: {
      src: whereAiShouldntGo,
      alt: "Two people talking across a small table, coffee cups in the foreground.",
    },
    draft: false,
  },
  {
    slug: "ai-usage-policy",
    title: "How to write an AI usage policy your team will actually read",
    description:
      "One page, plain language, real examples. How to write an AI usage policy for a small business, with a template you can adapt this week.",
    excerpt:
      "One page, plain language, real examples. A template you can adapt this week.",
    category: "Governance",
    tags: ["Policy", "POPIA"],
    date: "2026-11-12",
    readMinutes: 2,
    image: {
      src: usagePolicy,
      alt: "A single printed page on a desk beside a pen and a coffee cup.",
    },
    draft: false,
  },
  {
    slug: "invoice-capture",
    title: "Invoice capture without the re-typing",
    description:
      "Supplier invoices read, checked and posted to your accounts, with exceptions flagged for a person. How AI invoice capture works in a small business.",
    excerpt:
      "Supplier invoices read, checked and posted to your accounts, with exceptions flagged for a person.",
    category: "Automation",
    tags: ["Invoices", "Finance admin"],
    date: "2026-11-12",
    readMinutes: 2,
    image: {
      src: invoiceCapture,
      alt: "A stack of supplier invoices beside a laptop and a calculator.",
    },
    draft: false,
  },
];

/** Drafts are visible in `next dev` so they can be previewed. */
const showDrafts = process.env.NODE_ENV === "development";

/** Visible articles, newest first. */
export const publishedArticles = articles
  .filter((article) => showDrafts || !article.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const articlePath = (article: Pick<Article, "slug">) =>
  `/blog/${article.slug}` as const;

export const categorySlug = (category: Category) => category.toLowerCase();

export const categoryPath = (category: Category) =>
  `/blog/category/${categorySlug(category)}` as const;

/** Categories with at least one visible article, in display order. */
export const activeCategories = categories.filter((category) =>
  publishedArticles.some((article) => article.category === category),
);

export const findArticle = (slug: string) =>
  publishedArticles.find((article) => article.slug === slug);

export const formatArticleDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/** The "Start here" article at the top of the blog. */
export const featuredArticle =
  findArticle("what-ai-can-do-for-a-small-business") ?? publishedArticles[0];

export const articlesIn = (category: Category) =>
  publishedArticles.filter((article) => article.category === category);

/** A topic page is worth indexing once it lists more than one article. */
export const isCategoryIndexable = (category: Category) =>
  articlesIn(category).length > 1;
