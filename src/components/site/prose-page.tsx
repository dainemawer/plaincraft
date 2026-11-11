import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/lib/site";
import {
  type Crumb,
  type ProsePageType,
  prosePageStructuredData,
} from "@/lib/structured-data";

type ProsePageProps = {
  path: `/${string}`;
  title: string;
  description: string;
  /** schema.org page type, e.g. "AboutPage". Defaults to "WebPage". */
  type?: ProsePageType;
  /** Pages between Home and this one, e.g. the Services hub. */
  parents?: Crumb[];
  /** Label for this page in the breadcrumb, if shorter than the title. */
  crumb?: string;
  /** ISO date, e.g. "2026-11-11". Shown for policies; omit elsewhere. */
  updated?: string;
  /** Show the "book a call" prompt after the content. */
  cta?: boolean;
  children: ReactNode;
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

/** Long-form layout for text pages, typeset with plain element styles. */
export function ProsePage({
  path,
  title,
  description,
  type = "WebPage",
  parents = [],
  crumb,
  updated,
  cta = false,
  children,
}: ProsePageProps) {
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    ...parents,
    { name: crumb ?? title, path },
  ];

  return (
    <article className="shell section-y">
      <JsonLd
        data={prosePageStructuredData({
          type,
          path,
          name: title,
          description,
          trail,
        })}
      />
      <header className="max-w-[760px] border-b border-ink pb-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-graphite">
          <ol className="flex flex-wrap gap-x-2 gap-y-1">
            {trail.map((item, index) => {
              const current = index === trail.length - 1;
              return (
                <li key={item.path} className="flex gap-2">
                  {current ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <>
                      <Link href={item.path} className="hover:text-rust">
                        {item.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="text-heading font-bold text-balance">{title}</h1>
        <p className="mt-6 text-lg/[1.55] text-graphite text-pretty">
          {description}
        </p>
        {updated ? (
          <p className="mt-4 text-sm text-graphite">
            Last updated: <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        ) : null}
      </header>
      <div className="max-w-[720px] text-[17px]/[1.65] text-graphite [&_a]:text-ink [&_a]:underline [&_a:hover]:text-rust [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.025em] [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
      {cta ? (
        <aside
          aria-labelledby="prose-cta-title"
          className="mt-16 max-w-[720px] border border-ink bg-cream p-[clamp(24px,3vw,40px)]"
        >
          <h2
            id="prose-cta-title"
            className="text-2xl font-bold tracking-[-0.025em] text-balance"
          >
            Not sure where to start? Book a free 30-minute call.
          </h2>
          <p className="mt-3 text-[17px]/[1.6] text-graphite">
            Plain English, no sales pitch. If AI isn't the answer for your
            business, I'll say so.
          </p>
          <ButtonLink href={site.calendarUrl} className="mt-6">
            Book your free call
          </ButtonLink>
        </aside>
      ) : null}
    </article>
  );
}
