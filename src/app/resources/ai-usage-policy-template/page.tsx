import Link from "next/link";
import type { ReactNode } from "react";
import { emailResource } from "@/app/actions/resources";
import { EmailCopyForm } from "@/components/forms/email-copy-form";
import { PrintButton } from "@/components/resources/print-button";
import { BookCall } from "@/components/sections/book-call";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import {
  notLegalAdvice,
  policyBlanks,
  policyIntro,
  policySections,
  policyTitle,
  resources,
} from "@/content/resources";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { type Crumb, templateStructuredData } from "@/lib/structured-data";

const resource = resources["ai-usage-policy-template"];
const downloadPath = `${resource.path}/download`;

export const metadata = pageMetadata({
  title: "AI Usage Policy Template for SMEs · Free, POPIA-ready",
  description: resource.description,
  path: resource.path,
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "AI usage policy template", path: resource.path },
];

/** Marks [BLANKS] so they stand out on screen and in print. */
function withBlanks(text: string): ReactNode[] {
  return text.split(/(\[[A-Z][A-Z ]+\])/g).map((part, index) =>
    /^\[[A-Z][A-Z ]+\]$/.test(part) ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts of a fixed string
      <mark key={index} className="bg-ember/25 px-0.5 text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function PolicyTemplatePage() {
  return (
    <>
      <JsonLd
        data={templateStructuredData({
          path: resource.path,
          name: resource.title,
          description: resource.description,
          trail,
          updated: resource.updated,
          downloadPath,
        })}
      />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)] print:hidden">
        <Breadcrumb trail={trail} />
        <h1 className="max-w-[900px] text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
          {resource.title}.
        </h1>
        <p className="mt-6 max-w-[680px] text-lede text-graphite text-pretty">
          {resource.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={downloadPath}
            download
            {...track(events.resourceDownload, resource.id)}
          >
            Download for Word
          </ButtonLink>
          <PrintButton />
          <ButtonLink href="#email-copy" variant="outline">
            Email me a copy
          </ButtonLink>
        </div>
        <section
          aria-labelledby="how-title"
          className="mt-12 max-w-[760px] border-t border-ink pt-6"
        >
          <h2 id="how-title" className="text-xl font-bold tracking-[-0.02em]">
            How to use it
          </h2>
          <ol className="mt-3 list-decimal pl-5 text-[17px]/[1.6] text-graphite [&_li]:mt-1.5">
            <li>
              Fill in the blanks:{" "}
              {policyBlanks.map((blank, index) => (
                <span key={blank}>
                  <mark className="bg-ember/25 px-0.5 text-ink">{blank}</mark>
                  {index < policyBlanks.length - 1 ? ", " : "."}
                </span>
              ))}
            </li>
            <li>
              List only tools on a business plan that doesn't train on your
              data. The{" "}
              <Link
                href="/resources/popia-ai-checklist"
                className="text-ink underline hover:text-rust"
              >
                POPIA + AI checklist
              </Link>{" "}
              helps you check.
            </li>
            <li>Delete the guidance notes and any examples you don't use.</li>
            <li>
              Walk the team through it in 15 minutes, with examples from their
              own work, and have everyone sign the last section.
            </li>
            <li>Review it every six months, or when you add a tool.</li>
          </ol>
        </section>
      </header>

      <section
        aria-label="Policy template"
        className="border-t border-ink/12 bg-sand print:border-0 print:bg-transparent"
      >
        <div className="shell py-[clamp(48px,6vw,88px)] print:py-0">
          <article className="max-w-[780px] border border-ink bg-cream p-[clamp(24px,4vw,56px)] text-[17px]/[1.6] text-graphite print:border-0 print:p-0 print:text-[11pt]">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink">
              {withBlanks(policyTitle)}
            </h2>
            <p className="mt-2 text-sm">{withBlanks(policyIntro)}</p>
            {policySections.map((section) => (
              <section
                key={section.heading}
                className="mt-8 print:mt-4 print:break-inside-avoid"
              >
                <h3 className="text-lg font-bold tracking-[-0.015em] text-ink">
                  {section.heading}
                </h3>
                {(section.body ?? []).map((paragraph) => (
                  <p key={paragraph} className="mt-2">
                    {withBlanks(paragraph)}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-2 list-disc pl-5 [&_li]:mt-1">
                    {section.list.map((item) => (
                      <li key={item}>{withBlanks(item)}</li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-[15px]">
                      <thead>
                        <tr>
                          {section.table[0].map((cell) => (
                            <th
                              key={cell}
                              scope="col"
                              className="border border-ink/30 bg-sand px-3 py-2 text-left font-semibold text-ink"
                            >
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.slice(1).map((row, rowIndex) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static rows, some empty
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td
                                // biome-ignore lint/suspicious/noArrayIndexKey: static cells, some empty
                                key={cellIndex}
                                className="h-10 border border-ink/30 px-3 py-2 align-top"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {section.guidance ? (
                  <p className="mt-2 border-l-2 border-ember pl-3 text-sm italic print:hidden">
                    Guidance: {section.guidance}
                  </p>
                ) : null}
              </section>
            ))}
          </article>
          <p className="mt-6 max-w-[780px] text-sm/[1.55] text-graphite italic print:text-xs">
            {notLegalAdvice} Template from plaincraft.co.za, free to use and
            adapt for your own business.
          </p>
        </div>
      </section>

      <section
        id="email-copy"
        aria-labelledby="email-title"
        className="border-t border-ink/12 bg-cream print:hidden"
      >
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-16 gap-y-10 py-[clamp(56px,7vw,96px)]">
          <div>
            <h2 id="email-title" className="text-heading-sm font-bold">
              Email me a copy.
            </h2>
            <p className="mt-4 max-w-[480px] text-[17px]/[1.6] text-graphite">
              The template in your inbox, with a link to the Word version, so
              you can fill it in when you have half an hour.
            </p>
          </div>
          <EmailCopyForm
            action={emailResource}
            hidden={{ resource: resource.id }}
            submitLabel="Email the template"
            consentLabel="Email me this template."
            sentLabel="the template"
          />
        </div>
      </section>

      <div className="print:hidden">
        <BookCall
          title="Want a policy that fits how your team works?"
          note="The governance service covers the policy, a POPIA check of your tools and a team briefing, at a fixed fee. Start with a free 30-minute call."
        />
      </div>
    </>
  );
}
