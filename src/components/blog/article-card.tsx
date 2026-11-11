import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import {
  type Article,
  articlePath,
  formatArticleDate,
} from "@/content/articles";

/** Grid card linking to an article. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="border-r border-b border-ink bg-paper transition-colors duration-300 hover:bg-cream">
      <Link
        href={articlePath(article)}
        className="flex h-full flex-col gap-3.5 p-[clamp(20px,2.4vw,28px)] text-ink no-underline"
      >
        <div className="relative mb-1.5 aspect-[16/10] w-full overflow-hidden border border-ink bg-sand">
          <Photo
            src={article.image.src}
            alt=""
            sizes="(min-width: 1100px) 400px, (min-width: 720px) 50vw, 100vw"
          />
        </div>
        <p className="flex justify-between gap-3 text-[13px]">
          <span className="font-medium text-rust">{article.category}</span>
          <span className="text-graphite">{article.readMinutes} min read</span>
        </p>
        <h3 className="text-2xl/[1.12] font-bold tracking-[-0.025em] text-balance">
          {article.title}
        </h3>
        <p className="text-base/[1.55] text-graphite text-pretty">
          {article.excerpt}
        </p>
        <time
          dateTime={article.date}
          className="mt-auto border-t border-ink/15 pt-3.5 text-[13px] text-graphite"
        >
          {formatArticleDate(article.date)}
        </time>
      </Link>
    </article>
  );
}
