import Link from "next/link";
import { emailResource } from "@/app/actions/resources";
import { EmailCopyForm } from "@/components/forms/email-copy-form";
import { PrintButton } from "@/components/resources/print-button";
import { BookCall } from "@/components/sections/book-call";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import {
  checklist,
  checklistCount,
  notLegalAdvice,
  resources,
} from "@/content/resources";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { type Crumb, checklistStructuredData } from "@/lib/structured-data";

const resource = resources["popia-ai-checklist"];
const downloadPath = `${resource.path}/download`;

export const metadata = pageMetadata({
  title: "POPIA + AI Checklist for SMEs · Free and printable",
  description: resource.description,
  path: resource.path,
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "POPIA + AI checklist", path: resource.path },
];

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

/** Checks numbered 1–15 across the groups. */
const numbered = checklist.map((group, index) => {
  const start = checklist
    .slice(0, index)
    .reduce((sum, previous) => sum + previous.items.length, 0);
  return {
    ...group,
    items: group.items.map((item, offset) => ({
      ...item,
      n: start + offset + 1,
    })),
  };
});

export default function PopiaChecklistPage() {
  return (
    <>
      <JsonLd
        data={checklistStructuredData(
          {
            path: resource.path,
            name: resource.title,
            description: resource.description,
            trail,
            updated: resource.updated,
            downloadPath,
          },
          checklist.map((group) => ({
            heading: group.heading,
            checks: group.items.map((item) => item.check),
          })),
        )}
      />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)] print:pt-0 print:pb-4">
        <Breadcrumb trail={trail} className="mb-6 print:hidden" />
        <h1 className="max-w-[900px] text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance print:text-3xl">
          {resource.title}.
        </h1>
        <p className="mt-6 max-w-[680px] text-lede text-graphite text-pretty print:mt-3 print:text-base">
          {resource.summary}
        </p>
        <p className="mt-4 text-sm text-graphite">
          {checklistCount} checks · Last reviewed{" "}
          <time dateTime={resource.updated}>
            {formatDate(resource.updated)}
          </time>
        </p>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <PrintButton />
          <ButtonLink
            href={downloadPath}
            variant="outline-strong"
            download
            {...track(events.resourceDownload, resource.id)}
          >
            Download for Word
          </ButtonLink>
          <ButtonLink href="#email-copy" variant="outline">
            Email me a copy
          </ButtonLink>
        </div>
      </header>

      <section
        aria-label="Checklist"
        className="border-t border-ink/12 bg-sand print:border-0 print:bg-transparent"
      >
        <div className="shell flex max-w-[900px] flex-col gap-10 py-[clamp(48px,6vw,88px)] print:gap-4 print:py-0">
          {numbered.map((group) => (
            <div key={group.heading} className="print:break-inside-avoid">
              <h2 className="text-2xl font-bold tracking-[-0.025em] print:text-lg">
                {group.heading}
              </h2>
              <ol className="mt-4 border-t border-ink">
                {group.items.map((item) => (
                  <li
                    key={item.check}
                    value={item.n}
                    className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-ink/20 py-5 print:py-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 size-6 border-2 border-ink bg-cream print:size-4 print:border"
                    />
                    <div>
                      <p className="text-lg/[1.4] font-bold tracking-[-0.01em] text-ink print:text-sm">
                        <span className="mr-1.5 text-graphite">{item.n}.</span>
                        {item.check}
                      </p>
                      <p className="mt-1.5 text-base/[1.55] text-graphite print:text-xs">
                        {item.why}
                        {item.ref ? (
                          <span className="ml-1.5 whitespace-nowrap text-sm text-ink print:text-xs">
                            POPIA {item.ref}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <p className="text-sm/[1.55] text-graphite italic print:text-xs">
            {notLegalAdvice} From plaincraft.co.za.
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
              The full checklist in your inbox, with a link to the Word version,
              to forward to whoever handles your IT or compliance.
            </p>
          </div>
          <EmailCopyForm
            action={emailResource}
            hidden={{ resource: resource.id }}
            submitLabel="Email the checklist"
            consentLabel="Email me this checklist."
            sentLabel="the checklist"
          />
        </div>
      </section>

      <section
        aria-labelledby="next-title"
        className="shell py-[clamp(56px,7vw,96px)] print:hidden"
      >
        <h2 id="next-title" className="text-heading-sm font-bold">
          Next steps.
        </h2>
        <ul className="mt-6 grid max-w-[980px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-l border-ink">
          {[
            {
              href: "/resources/ai-usage-policy-template",
              title: "AI usage policy template",
              body: "Turn your answers into one page of rules your team will actually read.",
            },
            {
              href: "/blog/popia-ai-tools-checklist",
              title: "Why POPIA applies to AI tools",
              body: "The background to this checklist, in plain English.",
            },
            {
              href: "/services/ai-policy-popia",
              title: "Governance and POPIA, done for you",
              body: "A written AI policy, a data register and a team briefing, at a fixed fee.",
            },
          ].map((link) => (
            <li
              key={link.href}
              className="border-r border-b border-ink p-[clamp(20px,2.5vw,32px)]"
            >
              <Link
                href={link.href}
                className="text-lg font-bold tracking-[-0.015em] hover:text-rust"
              >
                {link.title} →
              </Link>
              <p className="mt-2 text-base/[1.55] text-graphite">{link.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="print:hidden">
        <BookCall
          title="Not sure how your team's AI use stacks up?"
          note="Book a free 30-minute call. I'll go through the checklist with you and tell you which gaps matter, in plain English."
        />
      </div>
    </>
  );
}
