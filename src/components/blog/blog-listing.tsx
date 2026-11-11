import Link from "next/link";
import { BookCall } from "@/components/sections/book-call";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { Photo } from "@/components/ui/photo";
import {
  activeCategories,
  articlePath,
  type Category,
  categoryPath,
  featuredArticle,
  publishedArticles,
} from "@/content/articles";
import { site } from "@/lib/site";
import { blogStructuredData, type Crumb } from "@/lib/structured-data";
import { ArticleCard } from "./article-card";

type BlogListingProps = {
  title: string;
  lede: string;
  description: string;
  /** Show one category's articles instead of the whole blog. */
  category?: Category;
};

/** The blog index and its category pages. */
export function BlogListing({
  title,
  lede,
  description,
  category,
}: BlogListingProps) {
  const path: `/${string}` = category ? categoryPath(category) : "/blog";
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(category ? [{ name: category, path }] : []),
  ];

  const featured = category ? undefined : featuredArticle;
  const listed = publishedArticles.filter(
    (article) =>
      (category ? article.category === category : true) &&
      article.slug !== featured?.slug,
  );

  return (
    <>
      <JsonLd
        data={blogStructuredData(
          { path, name: title, description, trail },
          category ? listed : publishedArticles,
        )}
      />
      <section
        aria-labelledby="blog-title"
        className="shell pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,48px)]"
      >
        <Breadcrumb trail={trail} className="mb-7" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-end gap-x-[72px] gap-y-6">
          <h1
            id="blog-title"
            data-hero=""
            className="text-[clamp(2.75rem,6.4vw,5.6rem)] leading-[0.96] font-bold tracking-[-0.045em] text-balance"
          >
            {title}
          </h1>
          <p
            data-hero=""
            style={{ "--hero-index": 1 }}
            className="max-w-[520px] text-lede text-graphite text-pretty"
          >
            {lede}
          </p>
        </div>
      </section>

      {featured ? (
        <section aria-label="Featured article" className="shell">
          <Link
            href={articlePath(featured)}
            data-reveal=""
            className="grid border border-ink bg-paper min-[960px]:grid-cols-2 text-ink no-underline transition-colors duration-300 hover:bg-cream"
          >
            <div className="relative aspect-[4/3] border-b border-ink bg-sand min-[960px]:aspect-auto min-[960px]:min-h-[440px] min-[960px]:border-r min-[960px]:border-b-0">
              <Photo
                src={featured.image.src}
                alt=""
                sizes="(min-width: 960px) 620px, 100vw"
                preload
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,56px)]">
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                <span className="bg-ember px-[9px] py-[5px] font-medium">
                  Start here
                </span>
                <span className="text-graphite">
                  {featured.category} · {featured.readMinutes} min read
                </span>
              </p>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
                {featured.title}
              </h2>
              <p className="max-w-[520px] text-lg/[1.55] text-graphite text-pretty">
                {featured.description}
              </p>
              <span className="mt-2 inline-flex items-center gap-2.5 text-base font-semibold underline underline-offset-[5px]">
                Read the guide{" "}
                <span aria-hidden="true" className="glyph">
                  →
                </span>
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <section
        aria-labelledby="all-title"
        className="shell pt-[clamp(56px,7vw,96px)] pb-[clamp(64px,9vw,128px)]"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2
            id="all-title"
            className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-bold tracking-[-0.035em]"
          >
            {category ? `${category} articles` : "All articles"}
          </h2>
          {activeCategories.length > 1 ? (
            <nav aria-label="Topics">
              <ul className="flex flex-wrap gap-2">
                {[undefined, ...activeCategories].map((item) => {
                  const current = item === category;
                  return (
                    <li key={item ?? "all"}>
                      <Link
                        href={item ? categoryPath(item) : "/blog"}
                        aria-current={current ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center border border-ink px-4 py-2.5 text-sm font-medium no-underline transition-colors duration-200 ${
                          current
                            ? "bg-ink text-paper"
                            : "text-ink hover:bg-sand"
                        }`}
                      >
                        {item ?? "All"}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </div>

        {listed.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] border-t border-l border-ink">
            {listed.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="border-y border-ink/15 py-10 text-[17px]/[1.55] text-graphite">
            More guides are on the way. Is there a question you'd like answered?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline hover:text-rust"
            >
              Email {site.email}
            </a>
            .
          </p>
        )}
      </section>

      <BookCall
        title="Rather talk it through? It's 30 minutes and free."
        note="Bring a question from any article. You'll leave with clear next steps."
      />
    </>
  );
}
