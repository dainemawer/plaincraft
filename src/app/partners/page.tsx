import Link from "next/link";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import {
  partnerFaqs,
  partnerOffers,
  partnerTypes,
  referral,
} from "@/content/partners";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { type Crumb, prosePageStructuredData } from "@/lib/structured-data";

const path = "/partners";
const title = "Partner programme for accountants, IT providers and law firms";
const description = `Refer South African SME clients who need practical help with AI. ${referral.feeShare * 100}% referral fee or a client discount, a free co-hosted workshop, and your client stays your client.`;

export const metadata = pageMetadata({
  title: "AI Consultancy Partner Programme · Accountants, IT and law firms",
  description,
  path,
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Partners", path },
];

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Plaincraft partner programme")}&body=${encodeURIComponent("Hi Daine,\n\nI'd like to hear more about the partner programme.\n\nFirm:\nWhat we do:\nRoughly how many SME clients:\n\n")}`;

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={prosePageStructuredData({
          type: "WebPage",
          path,
          name: title,
          description,
          trail,
        })}
      />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,64px)]">
        <Breadcrumb trail={trail} />
        <h1 className="max-w-[960px] text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
          Your clients are asking about AI. Send them somewhere safe.
        </h1>
        <p className="mt-6 max-w-[680px] text-lede text-graphite text-pretty">
          {site.name} is an independent AI consultancy for South African
          businesses with 10 to 250 staff. I work with accountants, IT providers
          and law firms whose clients need practical, fixed-fee help with AI,
          and I hand everything else straight back to you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={mailto}
            {...track(events.partnerEnquiry, "partners-hero")}
          >
            Become a partner
          </ButtonLink>
          <ButtonLink href="#terms" variant="outline">
            See the terms
          </ButtonLink>
        </div>
      </header>

      <section
        aria-labelledby="who-title"
        className="border-t border-ink/12 bg-sand"
      >
        <div className="shell py-[clamp(56px,7vw,96px)]">
          <h2
            id="who-title"
            className="mb-8 text-heading font-bold text-balance"
          >
            Who it's for.
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-l border-ink">
            {partnerTypes.map((type) => (
              <li
                key={type.title}
                className="border-r border-b border-ink bg-paper p-[clamp(20px,2.5vw,32px)]"
              >
                <h3 className="text-xl font-bold tracking-[-0.02em]">
                  {type.title}
                </h3>
                <p className="mt-3 text-base/[1.55] text-graphite">
                  {type.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="offer-title"
        className="shell py-[clamp(56px,7vw,96px)]"
      >
        <h2
          id="offer-title"
          className="mb-8 text-heading font-bold text-balance"
        >
          What you and your clients get.
        </h2>
        <ul className="grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-12 gap-y-8">
          {partnerOffers.map((offer) => (
            <li key={offer.title} className="border-t border-ink pt-5">
              <h3 className="text-xl font-bold tracking-[-0.02em]">
                {offer.title}
              </h3>
              <p className="mt-3 text-base/[1.55] text-graphite">
                {offer.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[680px] text-[17px]/[1.6] text-graphite">
          The services your clients can book, from a{" "}
          <Link
            href="/services/ai-readiness-audit"
            className="text-ink underline hover:text-rust"
          >
            two-week readiness audit
          </Link>{" "}
          to{" "}
          <Link
            href="/services/ai-training"
            className="text-ink underline hover:text-rust"
          >
            staff training
          </Link>
          , all have{" "}
          <Link href="/pricing" className="text-ink underline hover:text-rust">
            published fixed fees
          </Link>
          , so you know what you're recommending.
        </p>
      </section>

      <section
        id="terms"
        aria-labelledby="terms-title"
        className="border-t border-ink/12 bg-cream"
      >
        <div className="shell py-[clamp(56px,7vw,96px)]">
          <h2 id="terms-title" className="text-heading font-bold text-balance">
            Referral terms.
          </h2>
          <dl className="mt-8 grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-t border-ink">
            {[
              {
                label: "Referral fee",
                value: `${referral.feeShare * 100}% of the first engagement`,
              },
              {
                label: "Paid",
                value: `Within ${referral.payWithinDays} days of the client paying`,
              },
              {
                label: "Introduction counts for",
                value: `${referral.validMonths} months`,
              },
              {
                label: "Prefer no fee?",
                value: "Pass it on as a client discount",
              },
            ].map((term) => (
              <div
                key={term.label}
                className="border-b border-ink/20 py-5 pr-6"
              >
                <dt className="text-[13px] text-graphite">{term.label}</dt>
                <dd className="mt-1.5 text-[22px] leading-tight font-bold tracking-[-0.02em]">
                  {term.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[680px] text-[17px]/[1.6] text-graphite">
            Any referral fee is disclosed to the client in writing. If your
            professional rules don't allow fees, refer both ways instead: I send
            clients who need accounting, IT or legal help to partners I trust.
          </p>
          <ButtonLink
            href={mailto}
            className="mt-8"
            {...track(events.partnerEnquiry, "partners-terms")}
          >
            Email me about partnering
          </ButtonLink>
        </div>
      </section>

      <Faq title="Partner questions." items={partnerFaqs} />
    </>
  );
}
