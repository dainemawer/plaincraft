import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import founderPhoto from "@/assets/images/daine-mawer.jpg";
import { ArticleCard } from "@/components/blog/article-card";
import { BookCall } from "@/components/sections/book-call";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { Photo } from "@/components/ui/photo";
import {
  type Article,
  articlePath,
  categoryPath,
  findArticle,
  formatArticleDate,
  publishedArticles,
} from "@/content/articles";
import { articleBodies, articleSource, articleToc } from "@/content/blog";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/lib/site";
import { articleStructuredData, type Crumb } from "@/lib/structured-data";

export function generateStaticParams() {
  return publishedArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title.replace(/\.$/, ""),
    description: article.description,
    path: articlePath(article),
    image: {
      url: absoluteUrl(article.image.src.src),
      width: article.image.src.width,
      height: article.image.src.height,
      alt: article.image.alt,
    },
    article: {
      publishedTime: article.date,
      modifiedTime: article.updated,
      section: article.category,
    },
  });
}

/** Up to three other articles: same topic first, then the newest. */
function relatedTo(article: Article) {
  const others = publishedArticles.filter(
    (other) => other.slug !== article.slug,
  );
  return [
    ...others.filter((other) => other.category === article.category),
    ...others.filter((other) => other.category !== article.category),
  ].slice(0, 3);
}

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const article = findArticle((await params).slug);
  const load = article ? articleBodies[article.slug] : undefined;
  if (!article || !load) notFound();

  const { default: Body } = await load();
  const toc = articleToc(articleSource(article.slug));
  const header = article.header ?? article.image;
  const caption = article.header?.caption;
  const related = relatedTo(article);
  const path = articlePath(article);
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.category, path: categoryPath(article.category) },
    { name: article.title, path },
  ];

  return (
    <>
      <JsonLd data={articleStructuredData(article, trail)} />
      <article aria-labelledby="post-title">
        <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)]">
          {/* The article itself is the h1, so the trail stops at its topic. */}
          <Breadcrumb trail={trail.slice(0, -1)} className="mb-8" />
          <h1
            id="post-title"
            data-hero=""
            className="max-w-[1060px] text-[clamp(2.5rem,5.8vw,5rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance"
          >
            {article.title}
          </h1>
          <p
            data-hero=""
            style={{ "--hero-index": 1 }}
            className="mt-7 max-w-[720px] text-[clamp(1.1rem,1.5vw,1.35rem)]/[1.5] text-graphite text-pretty"
          >
            {article.description}
          </p>
          <div
            data-hero=""
            style={{ "--hero-index": 2 }}
            className="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-ink pt-5"
          >
            <div className="flex items-center gap-3.5">
              <Image
                src={founderPhoto}
                alt=""
                width={48}
                height={48}
                className="size-12 shrink-0 border border-ink object-cover photo-tone"
              />
              <p className="flex flex-col gap-0.5 text-[15px]">
                <span className="font-semibold">{site.founder.name}</span>
                <span className="text-sm text-graphite">
                  Founder, {site.name}
                </span>
              </p>
            </div>
            <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-graphite">
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
              <span>{article.readMinutes} min read</span>
            </p>
          </div>
        </header>

        <figure className="shell">
          <div className="relative aspect-[21/9] min-h-[240px] overflow-hidden border border-ink bg-sand">
            <Photo
              src={header.src}
              alt={header.alt}
              sizes="(min-width: 1280px) 1184px, 100vw"
              preload
            />
          </div>
          {caption ? (
            <figcaption className="mt-3 text-sm text-graphite">
              {caption}
            </figcaption>
          ) : null}
        </figure>

        <div className="shell grid items-start gap-[clamp(40px,6vw,96px)] pt-[clamp(48px,6vw,88px)] pb-[clamp(64px,8vw,112px)] nav:grid-cols-[240px_minmax(0,720px)]">
          <aside
            aria-label="On this page"
            className="sticky top-[110px] hidden flex-col gap-6 nav:flex"
          >
            <nav className="border-t border-ink">
              <p className="border-b border-ink/15 py-3.5 text-[13px] text-graphite">
                On this page
              </p>
              <ol>
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex gap-3 border-b border-ink/15 py-3 text-[15px]/[1.35] text-graphite no-underline hover:text-ink"
                    >
                      <span className="min-w-5 pt-px text-[13px] text-rust">
                        {index + 1}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <ButtonLink
              href={site.calendarUrl}
              variant="dark"
              size="compact"
              className="justify-between"
              {...track(events.bookCall, "article-sidebar")}
            >
              Book a free call
            </ButtonLink>
          </aside>

          <div className="min-w-0 max-w-[720px] text-[19px]/[1.65]">
            <Body />

            <div className="mt-14 flex flex-wrap gap-2 border-t border-ink pt-6">
              <span className="mr-2 py-2 text-[13px] text-graphite">
                Filed under
              </span>
              <Link
                href={categoryPath(article.category)}
                className="border border-ink/30 px-3 py-[7px] text-sm no-underline hover:border-ink"
              >
                {article.category}
              </Link>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-ink/15 px-3 py-[7px] text-sm text-graphite"
                >
                  {tag}
                </span>
              ))}
            </div>

            <section
              aria-label="About the author"
              className="mt-12 grid grid-cols-[96px_minmax(0,1fr)] items-start gap-x-6 gap-y-5 border-y border-ink/15 py-7"
            >
              <div className="relative aspect-square overflow-hidden border border-ink bg-sand">
                <Photo src={founderPhoto} alt="" sizes="96px" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-[-0.015em]">
                  Written by {site.founder.name}
                </p>
                <p className="mt-2 text-base/[1.55] text-graphite">
                  Founder of {site.name}, an independent AI consultancy for
                  South African SMEs, with 17 years of building websites and
                  digital products behind it. AI is part of how I work every
                  day, so I know where it earns its keep and where it doesn't.
                </p>
                <Link
                  href="/about"
                  className="mt-3 inline-block text-[15px] font-semibold underline hover:text-rust"
                >
                  More about me
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-title"
          className="border-t border-ink/12 bg-sand"
        >
          <div className="shell py-[clamp(56px,7vw,96px)]">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <h2
                id="related-title"
                className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-bold tracking-[-0.035em]"
              >
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="text-base font-semibold underline underline-offset-[5px] hover:text-rust"
              >
                All articles{" "}
                <span aria-hidden="true" className="glyph">
                  →
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-ink">
              {related.map((other) => (
                <ArticleCard key={other.slug} article={other} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <BookCall />
    </>
  );
}
