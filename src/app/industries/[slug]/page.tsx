import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCall } from "@/components/sections/book-call";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { findIndustry, industries, industryPath } from "@/content/industries";
import {
  activeMarkets,
  servicePriceById,
  startingPrice,
} from "@/content/pricing";
import { serviceDetailById, servicePath } from "@/content/services";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { type Crumb, industryPageStructuredData } from "@/lib/structured-data";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const industry = findIndustry((await params).slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.title,
    description: industry.description,
    path: industryPath(industry),
  });
}

const linkClass = "text-ink underline hover:text-rust";

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const industry = findIndustry((await params).slug);
  if (!industry) notFound();

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: industryPath(industry) },
  ];
  const first = serviceDetailById.get(industry.start.serviceId);
  const price = first ? servicePriceById.get(first.id) : undefined;

  return (
    <>
      <JsonLd data={industryPageStructuredData(industry, trail)} />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,64px)]">
        <Breadcrumb trail={trail} />
        <h1 className="max-w-[960px] text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
          {industry.headline}
        </h1>
        <p className="mt-6 max-w-[680px] text-lede text-graphite text-pretty">
          {industry.lede}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={site.calendarUrl}
            {...track(events.bookCall, "industry-hero")}
          >
            Book a free call
          </ButtonLink>
          <ButtonLink href="/scorecard" variant="outline">
            Take the readiness scorecard
          </ButtonLink>
        </div>
      </header>

      <section
        aria-labelledby="uses-title"
        className="border-t border-ink/12 bg-sand"
      >
        <div className="shell py-[clamp(56px,7vw,96px)]">
          <h2
            id="uses-title"
            className="mb-8 text-heading font-bold text-balance"
          >
            Where AI helps first.
          </h2>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-ink">
            {industry.uses.map((use, index) => (
              <li
                key={use.title}
                className="border-r border-b border-ink bg-paper p-[clamp(20px,2.5vw,32px)]"
              >
                <p className="text-[13px] text-graphite">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.02em]">
                  {use.title}
                </h3>
                <p className="mt-3 text-base/[1.55] text-graphite">
                  {use.body}
                </p>
                {use.href ? (
                  <p className="mt-3 text-base">
                    <Link href={use.href} className={linkClass}>
                      Read the guide
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="popia-title"
        className="shell py-[clamp(56px,7vw,96px)]"
      >
        <h2 id="popia-title" className="text-heading font-bold text-balance">
          POPIA and your sector.
        </h2>
        <p className="mt-6 max-w-[680px] text-[17px]/[1.6] text-graphite text-pretty">
          {industry.popia.intro}
        </p>
        <ul className="mt-8 grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-12 gap-y-8">
          {industry.popia.points.map((point) => (
            <li key={point.title} className="border-t border-ink pt-5">
              <h3 className="text-xl font-bold tracking-[-0.02em]">
                {point.title}
              </h3>
              <p className="mt-3 text-base/[1.55] text-graphite">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[680px] text-[17px]/[1.6] text-graphite">
          This isn&rsquo;t legal advice. The free{" "}
          <Link href="/resources/popia-ai-checklist" className={linkClass}>
            POPIA + AI checklist
          </Link>{" "}
          covers the questions every business should answer before staff put
          personal information into an AI tool.
        </p>
      </section>

      <section
        aria-labelledby="saving-title"
        className="border-t border-ink/12 bg-cream"
      >
        <div className="shell py-[clamp(56px,7vw,96px)]">
          <h2 id="saving-title" className="text-heading font-bold text-balance">
            What it could save.
          </h2>
          <p className="mt-6 max-w-[680px] text-[17px]/[1.6] text-graphite">
            An illustrative example. Use your own numbers: how often the task
            happens, how long it takes, and how long checking a draft would
            take.
          </p>
          <dl className="mt-8 grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-ink">
            {[
              { label: "Task", value: industry.saving.task },
              { label: "The maths", value: industry.saving.maths },
              { label: "Time back", value: industry.saving.result },
            ].map((item) => (
              <div
                key={item.label}
                className="border-b border-ink/20 py-5 pr-6"
              >
                <dt className="text-[13px] text-graphite">{item.label}</dt>
                <dd className="mt-1.5 text-lg/[1.45] font-semibold">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          {industry.example ? (
            <blockquote className="mt-10 max-w-[680px] border-l-4 border-ember pl-5 text-[17px]/[1.6]">
              {industry.example}
            </blockquote>
          ) : null}
        </div>
      </section>

      {first ? (
        <section
          aria-labelledby="start-title"
          className="shell py-[clamp(56px,7vw,96px)]"
        >
          <h2 id="start-title" className="text-heading font-bold text-balance">
            Where to start.
          </h2>
          <div className="mt-8 max-w-[760px] border border-ink bg-paper p-[clamp(24px,3vw,40px)]">
            <h3 className="text-2xl font-bold tracking-[-0.025em]">
              <Link
                href={servicePath(first)}
                className="no-underline hover:text-rust"
              >
                {first.name}
              </Link>
            </h3>
            {price ? (
              <p className="mt-2 text-base font-semibold">
                {activeMarkets.map((market) => (
                  <span key={market} data-market={market}>
                    {startingPrice(market, price)}, fixed fee
                  </span>
                ))}
              </p>
            ) : null}
            <p className="mt-4 text-[17px]/[1.6] text-graphite">
              {industry.start.why}
            </p>
            <ButtonLink
              href={servicePath(first)}
              className="mt-6"
              variant="outline"
            >
              See what&rsquo;s included
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-[680px] text-[17px]/[1.6] text-graphite">
            Not sure yet? The free{" "}
            <Link href="/scorecard" className={linkClass}>
              AI readiness scorecard
            </Link>{" "}
            takes a few minutes and shows where your business stands. Every
            service has a{" "}
            <Link href="/pricing" className={linkClass}>
              published fixed fee
            </Link>
            .
          </p>
        </section>
      ) : null}

      <Faq
        title={`Questions from ${industry.name.toLowerCase()}.`}
        items={industry.faqs}
      />
      <BookCall title="Talk it through. 30 minutes, free." />
    </>
  );
}
