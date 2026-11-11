import { Photo } from "@/components/ui/photo";
import { SmartLink } from "@/components/ui/smart-link";
import { aiJobs } from "@/content/home";
import { site } from "@/lib/site";

export function WhatAiDoes() {
  return (
    <section
      id="what-ai-does"
      aria-labelledby="plain-title"
      className="shell section-y"
    >
      <div
        data-reveal=""
        className="mb-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-18 gap-y-5"
      >
        <h2 id="plain-title" className="text-heading font-bold text-balance">
          AI, in plain English.
        </h2>
        <p className="max-w-[520px] text-lg/[1.55] text-graphite text-pretty">
          Forget the hype. In most businesses, AI is good at three jobs. If your
          team does any of them every week, you're probably losing time you
          could get back.
        </p>
      </div>

      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-l border-ink">
        {aiJobs.map((job, index) => (
          <li
            key={job.id}
            data-reveal=""
            data-reveal-delay={index * 100}
            className="flex"
          >
            <article
              aria-labelledby={`${job.id}-title`}
              className="flex w-full flex-col gap-4 border-r border-b border-ink bg-paper p-[clamp(28px,3vw,40px)] transition-colors duration-300 hover:bg-cream"
            >
              <div className="relative mb-2 aspect-[4/3] w-full border border-ink bg-sand">
                <Photo
                  hint={job.photoHint}
                  sizes="(min-width: 1280px) 400px, (min-width: 700px) 33vw, 100vw"
                />
              </div>
              <span
                aria-hidden="true"
                className="text-[15px] font-semibold text-rust"
              >
                {index + 1}
              </span>
              <h3 id={`${job.id}-title`} className="text-jumbo font-bold">
                {job.title}
              </h3>
              <p className="text-[17px]/[1.55] text-graphite text-pretty">
                {job.body}
              </p>
              <p className="mt-auto border-t border-ink/15 pt-4 text-[15px]/[1.5]">
                <strong className="font-semibold">For example:</strong>{" "}
                {job.example}
              </p>
            </article>
          </li>
        ))}
      </ol>

      <div
        data-reveal=""
        className="mt-7 flex flex-wrap items-center justify-between gap-x-10 gap-y-5"
      >
        <p className="max-w-[640px] text-[17px]/[1.55] text-pretty">
          <strong className="font-semibold">What it's not good at:</strong>{" "}
          decisions that need judgement, accountability or a real relationship.
          I'll show you exactly where those lines are.
        </p>
        <SmartLink
          href={site.calendarUrl}
          className="inline-flex min-h-11 items-center gap-2.5 text-base font-semibold underline underline-offset-[5px] hover:text-rust"
        >
          Not sure which applies to you? Ask me{" "}
          <span aria-hidden="true" className="glyph">
            →
          </span>
        </SmartLink>
      </div>
    </section>
  );
}
