import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { SmartLink } from "@/components/ui/smart-link";
import { site } from "@/lib/site";
import { slugify, textOf } from "@/lib/slug";

/*
 * Typography and building blocks for blog articles (src/content/blog).
 * Markdown covers most of an article; the components below are available
 * in every MDX file without importing them.
 */

/** Boxed summary that opens an article. Not listed in the table of contents. */
function ShortAnswer({
  title = "The short answer",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="short-answer"
      className="mb-14 border border-ink bg-sand p-[clamp(24px,3vw,36px)] [&_p:last-child]:mb-0"
    >
      <h2
        id="short-answer"
        className="mb-3.5 text-[22px] leading-[1.2] font-bold tracking-[-0.02em]"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Numbered list of titled points, e.g. "1 It writes." */
function NumberedList({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-5 border-t border-ink [counter-reset:item]">
      {children}
    </ol>
  );
}

function NumberedItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-ink/20 py-[22px] [counter-increment:item] before:pt-1 before:text-[15px] before:font-semibold before:text-rust before:[content:counter(item)]">
      <div>
        <h3 className="mb-1.5 text-[22px] font-bold tracking-[-0.02em]">
          {title}
        </h3>
        <div className="text-[17px]/[1.6] text-graphite [&_p]:m-0">
          {children}
        </div>
      </div>
    </li>
  );
}

/** A schedule such as a week plan: a short label, then what happens. */
function Schedule({ children }: { children: ReactNode }) {
  return <ol className="mb-5 border-t border-ink">{children}</ol>;
}

function When({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b border-ink/20 py-[18px]">
      <span className="pt-[3px] text-[15px] font-semibold text-rust">
        {label}
      </span>
      <div className="text-[17px]/[1.55] [&_p]:m-0">{children}</div>
    </li>
  );
}

/** A list of things that go wrong, marked with crosses. */
function Pitfalls({ children }: { children: ReactNode }) {
  return <ul className="mb-5 flex flex-col gap-3.5">{children}</ul>;
}

function Pitfall({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[20px_minmax(0,1fr)] gap-2.5">
      <span aria-hidden="true" className="font-bold text-rust">
        ✕
      </span>
      <span>
        <strong>{title}</strong> {children}
      </span>
    </li>
  );
}

/** A list of good practices, marked with ticks. */
function Checklist({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-5 flex flex-col gap-3.5 [&>li]:grid [&>li]:grid-cols-[20px_minmax(0,1fr)] [&>li]:gap-2.5 [&>li]:before:font-bold [&>li]:before:text-rust [&>li]:before:content-['✓'] [&_p]:m-0">
      {children}
    </ul>
  );
}

/** Dark booking prompt placed mid-article. */
function InlineCta({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Book a call"
      className="my-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 bg-ink p-[clamp(24px,3vw,36px)] text-paper"
    >
      <div className="max-w-[400px] text-xl/[1.4] font-semibold tracking-[-0.015em] text-pretty [&_p]:m-0">
        {children}
      </div>
      <ButtonLink href={site.calendarUrl} variant="ember">
        Book a free call
      </ButtonLink>
    </aside>
  );
}

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-14 mb-5 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 mb-3 text-[22px] font-bold tracking-[-0.02em]">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-5 text-pretty">{children}</p>,
  a: ({ href = "", children }) => (
    <SmartLink href={href} className="underline hover:text-rust">
      {children}
    </SmartLink>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 flex list-disc flex-col gap-2 pl-6 marker:text-rust">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 flex list-decimal flex-col gap-2 pl-6 marker:font-semibold marker:text-rust">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-14 border-l-[3px] border-ember py-2 pl-7 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.25] font-semibold tracking-[-0.025em] text-balance [&_p]:m-0">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="mb-5 overflow-x-auto">
      <table className="w-full border-t border-ink text-left text-[17px]/[1.5] [&_td]:border-b [&_td]:border-ink/20 [&_td]:py-3 [&_td]:pr-4 [&_th]:border-b [&_th]:border-ink [&_th]:py-3 [&_th]:pr-4 [&_th]:text-sm [&_th]:font-semibold">
        {children}
      </table>
    </div>
  ),
  ShortAnswer,
  NumberedList,
  NumberedItem,
  Schedule,
  When,
  Pitfalls,
  Pitfall,
  Checklist,
  InlineCta,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
