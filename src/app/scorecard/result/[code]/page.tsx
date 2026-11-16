import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { emailReport } from "@/app/actions/scorecard";
import { EmailCopyForm } from "@/components/forms/email-copy-form";
import { ResultTracker } from "@/components/scorecard/step-tracker";
import { BookCall } from "@/components/sections/book-call";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { areas, resultPath, scoreResult } from "@/content/scorecard";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import type { Crumb } from "@/lib/structured-data";

/** Sample results to prerender. Any other valid code renders on first request. */
export function generateStaticParams() {
  return [
    { code: "0000000000" },
    { code: "2222222222" },
    { code: "3333333333" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/scorecard/result/[code]">): Promise<Metadata> {
  const result = scoreResult((await params).code);
  if (!result) return {};
  return {
    ...pageMetadata({
      title: `AI readiness score: ${result.score}/100`,
      description: `${result.band.name}. Take the free 10-question scorecard to see how ready your business is for AI.`,
      path: resultPath(result.code),
      socialTitle: `My business scored ${result.score}/100 for AI readiness`,
      socialDescription:
        "Ten questions, three minutes. How ready is your business for AI?",
    }),
    // One page per answer combination: share them, don't index them.
    robots: { index: false, follow: true },
  };
}

export default async function ScorecardResultPage({
  params,
}: PageProps<"/scorecard/result/[code]">) {
  const result = scoreResult((await params).code);
  if (!result) notFound();

  const path = resultPath(result.code);
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Scorecard", path: "/scorecard" },
    { name: "Your result", path },
  ];
  const focus = areas[result.weakest[0]];
  const topMoves = result.nextMoves.slice(0, 3);
  const shareText = encodeURIComponent(
    `My business scored ${result.score}/100 for AI readiness. How does yours compare?`,
  );
  const shareUrl = encodeURIComponent(absoluteUrl(path));

  return (
    <>
      <ResultTracker band={result.band.name} score={result.score} />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,64px)]">
        <Breadcrumb trail={trail} />
        <p className="text-sm font-semibold text-rust">
          Your AI readiness score
        </p>
        <h1 className="mt-2 text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] font-bold tracking-[-0.05em]">
          {result.score}
          <span className="text-graphite">/100</span>
        </h1>
        <p className="mt-6 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-bold tracking-[-0.03em]">
          {result.band.name}.
        </p>
        <p className="mt-4 max-w-[640px] text-lede text-graphite text-pretty">
          {result.band.summary}
        </p>
      </header>

      <section
        aria-labelledby="areas-title"
        className="border-t border-ink/12 bg-sand"
      >
        <div className="shell py-[clamp(48px,6vw,88px)]">
          <h2 id="areas-title" className="mb-8 text-heading font-bold">
            By area.
          </h2>
          <ul className="flex max-w-[760px] flex-col gap-6">
            {result.areas.map(({ area, score }) => (
              <li key={area}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-[-0.02em]">
                    {areas[area].label}
                  </h3>
                  <span className="text-xl font-bold">{score}/100</span>
                </div>
                <div
                  className="mt-2 h-3 border border-ink bg-cream"
                  role="img"
                  aria-label={`${areas[area].label}: ${score} out of 100`}
                >
                  <div
                    className={`h-full ${area === result.weakest[0] ? "bg-ember" : "bg-ink"}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="mt-2 text-[15px]/[1.5] text-graphite">
                  {areas[area].summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="next-title"
        className="shell py-[clamp(56px,7vw,104px)]"
      >
        <h2 id="next-title" className="text-heading font-bold text-balance">
          Start with {focus.label.toLowerCase()}.
        </h2>
        <p className="mt-4 max-w-[680px] text-[17px]/[1.65] text-graphite">
          {focus.low}
        </p>
        {topMoves.length > 0 ? (
          <ol className="mt-10 grid max-w-[980px] grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-l border-ink">
            {topMoves.map(({ question }, index) => (
              <li
                key={question.id}
                className="border-r border-b border-ink p-[clamp(20px,2.5vw,32px)]"
              >
                <p className="text-sm text-graphite">Next move {index + 1}</p>
                <h3 className="mt-2 text-lg/[1.3] font-bold tracking-[-0.015em]">
                  {question.question}
                </h3>
                <p className="mt-3 text-base/[1.55] text-graphite">
                  {question.nextMove}
                </p>
              </li>
            ))}
          </ol>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink
            href={result.band.service.href}
            {...track(events.explore, "scorecard-result")}
          >
            See {result.band.service.label}
          </ButtonLink>
          <ButtonLink href={focus.service} variant="outline">
            How I help with {focus.label.toLowerCase()}
          </ButtonLink>
        </div>
      </section>

      <section
        aria-labelledby="report-title"
        className="border-t border-ink/12 bg-cream"
      >
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-16 gap-y-10 py-[clamp(56px,7vw,96px)]">
          <div>
            <h2 id="report-title" className="text-heading-sm font-bold">
              Get the full report by email.
            </h2>
            <p className="mt-4 max-w-[480px] text-[17px]/[1.6] text-graphite">
              A next move for every answer, a simple 30-day plan, and links to
              the free POPIA checklist and AI policy template.
            </p>
          </div>
          <EmailCopyForm
            action={emailReport}
            hidden={{ code: result.code }}
            submitLabel="Email my report"
            consentLabel="Email me this report."
            sentLabel="the full report"
          />
        </div>
      </section>

      <section className="shell py-[clamp(40px,5vw,64px)]">
        <h2 className="text-xl font-bold tracking-[-0.02em]">
          Share your score
        </h2>
        <p className="mt-2 text-[15px] text-graphite">
          The link shows your score and areas, never who you are.
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <ButtonLink
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              variant="outline-strong"
              size="sm"
              icon="↗"
            >
              LinkedIn
            </ButtonLink>
          </li>
          <li>
            <ButtonLink
              href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
              variant="outline-strong"
              size="sm"
              icon="↗"
            >
              WhatsApp
            </ButtonLink>
          </li>
          <li>
            <ButtonLink
              href={`mailto:?subject=${encodeURIComponent("AI readiness scorecard")}&body=${shareText}%20${shareUrl}`}
              variant="outline-strong"
              size="sm"
            >
              Email
            </ButtonLink>
          </li>
        </ul>
        <p className="mt-6 text-[15px] text-graphite">
          Not your result?{" "}
          <Link
            href="/scorecard"
            className="text-ink underline hover:text-rust"
          >
            Take the scorecard
          </Link>
          .
        </p>
      </section>

      <BookCall
        title="Talk your score through on a free call."
        note="30 minutes, plain English. Bring your result and I'll tell you what I'd do first, whether or not we work together."
      />
    </>
  );
}
