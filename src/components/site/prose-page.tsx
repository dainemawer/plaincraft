import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import {
  type ProsePageType,
  prosePageStructuredData,
} from "@/lib/structured-data";

type ProsePageProps = {
  path: `/${string}`;
  title: string;
  description: string;
  /** schema.org page type, e.g. "AboutPage". Defaults to "WebPage". */
  type?: ProsePageType;
  /** ISO date, e.g. "2026-11-11". Shown for policies; omit elsewhere. */
  updated?: string;
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
  updated,
  children,
}: ProsePageProps) {
  return (
    <article className="shell section-y">
      <JsonLd
        data={prosePageStructuredData({
          type,
          path,
          name: title,
          description,
        })}
      />
      <header className="max-w-[760px] border-b border-ink pb-10">
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
      <div className="max-w-[720px] text-[17px]/[1.65] text-graphite [&_a]:text-ink [&_a]:underline [&_a:hover]:text-rust [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.025em] [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
