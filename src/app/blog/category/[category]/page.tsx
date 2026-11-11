import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import {
  activeCategories,
  type Category,
  categoryPath,
  categorySlug,
  isCategoryIndexable,
} from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

const titles: Record<Category, string> = {
  Guides: "Getting started with AI.",
  Automation: "Automating the admin.",
  Governance: "AI policy and POPIA.",
  Adoption: "Getting your team on board.",
  Buying: "Buying AI tools.",
};

const ledes: Record<Category, string> = {
  Guides:
    "Where to start with AI in a small business, and where not to. Plain-English guides for owners and managers.",
  Automation:
    "Step-by-step guides to automating quotes, invoices and other repetitive admin, with a person still in control.",
  Governance:
    "AI usage policies, POPIA and data handling, explained for South African small businesses.",
  Adoption:
    "How to get your team actually using the AI tools you already pay for.",
  Buying:
    "How to choose AI tools and vendors without overpaying or getting locked in.",
};

const findCategory = (slug: string) =>
  activeCategories.find((category) => categorySlug(category) === slug);

export function generateStaticParams() {
  return activeCategories.map((category) => ({
    category: categorySlug(category),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const category = findCategory((await params).category);
  if (!category) return {};
  return {
    ...pageMetadata({
      title: `AI ${category} for Small Businesses: Articles`,
      description: ledes[category],
      path: categoryPath(category),
    }),
    ...(isCategoryIndexable(category)
      ? {}
      : { robots: { index: false, follow: true } }),
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/blog/category/[category]">) {
  const category = findCategory((await params).category);
  if (!category) notFound();

  return (
    <BlogListing
      title={titles[category]}
      lede={ledes[category]}
      description={ledes[category]}
      category={category}
    />
  );
}
