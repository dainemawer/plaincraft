import Link from "next/link";
import { MarketSwitch } from "@/components/pricing/market-switch";
import { BookCall } from "@/components/sections/book-call";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { serviceStages } from "@/content/home";
import {
  formatPrice,
  type Market,
  markets,
  pricingFaqs,
  servicePriceById,
} from "@/content/pricing";
import { serviceDetailById, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { type Crumb, pricingPageStructuredData } from "@/lib/structured-data";

const path = "/pricing";
const title = "AI consulting prices for SMEs";
const description =
  "Fixed fees for every Plaincraft service, in rands for South African businesses and pounds for the UK and Europe. An AI readiness audit starts at R45,000.";

export const metadata = pageMetadata({
  title: "AI Consultant Pricing in South Africa · Fixed fees",
  description,
  path,
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Pricing", path },
];

const terms = [
  {
    title: "Fixed fee, in writing",
    body: "Every engagement is scoped and priced in writing before work starts. No day rates, no surprise invoices.",
  },
  {
    title: "Audit fee credited",
    body: "Book a build or retainer within 60 days of your audit and half the audit fee comes off.",
  },
  {
    title: "Half upfront",
    body: "Projects are paid half upfront and half on delivery. Retainers are billed monthly in advance.",
  },
  {
    title: "Founding clients: 30% off",
    body: "The first five clients in 2027 get 30% off their first engagement, in exchange for a case study.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={pricingPageStructuredData(
          { path, name: title, description, trail },
          pricingFaqs,
        )}
      />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,64px)]">
        <Breadcrumb trail={trail} />
        <h1 className="max-w-[900px] text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
          {title}.
        </h1>
        <p className="mt-6 max-w-[640px] text-lede text-graphite text-pretty">
          {description} Every fee is confirmed in writing after a free 30-minute
          call.
        </p>
      </header>

      <PriceLists />

      <section
        aria-labelledby="terms-title"
        className="shell py-[clamp(64px,8vw,112px)]"
      >
        <h2
          id="terms-title"
          className="mb-8 text-heading font-bold text-balance"
        >
          How pricing works.
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-t border-l border-ink">
          {terms.map((term) => (
            <li
              key={term.title}
              className="border-r border-b border-ink p-[clamp(20px,2.5vw,32px)]"
            >
              <h3 className="text-xl font-bold tracking-[-0.02em]">
                {term.title}
              </h3>
              <p className="mt-3 text-base/[1.55] text-graphite">{term.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Faq title="Questions about pricing." items={pricingFaqs} />
      <BookCall
        title="Get an exact quote on a free call."
        note="30 minutes, plain English. You'll leave with a fixed price for the work, or a straight answer that you don't need it."
      />
    </>
  );
}

const marketNotes: Record<Market, string> = {
  za: "Not VAT-registered: the price shown is the price you pay.",
  uk: "Delivered remotely. EU clients are quoted in euros at equivalent rates.",
};

/**
 * Both price lists are in the HTML, so search engines and AI crawlers see
 * every price. <MarketSwitch /> shows one at a time with CSS alone; without
 * :has() support both lists show.
 */
function PriceLists() {
  const list = Object.keys(markets) as Market[];
  return (
    <section
      aria-labelledby="prices-title"
      className="border-t border-ink/12 bg-sand"
    >
      <div className="shell py-[clamp(56px,7vw,96px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <h2 id="prices-title" className="text-heading font-bold text-balance">
            Price list.
          </h2>
          <MarketSwitch />
        </div>
        {list.map((market) => (
          <PriceList key={market} market={market} />
        ))}
      </div>
    </section>
  );
}

function PriceList({ market }: { market: Market }) {
  const { currency } = markets[market];
  return (
    <div data-market={market}>
      <p className="mt-4 text-[17px] text-graphite">
        Prices in {currency}. {marketNotes[market]}
      </p>
      <div className="mt-10 flex flex-col gap-12">
        {serviceStages.map((stage) => (
          <div key={stage.stage}>
            <h3 className="mb-4 text-[13px] text-graphite">
              {stage.stage}: {stage.label}
            </h3>
            <ul className="border-t border-ink">
              {stage.services.map((service) => {
                const price = servicePriceById.get(service.id);
                const detail = serviceDetailById.get(service.id);
                if (!price) return null;
                return (
                  <li
                    key={service.id}
                    className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-10 gap-y-4 border-b border-ink/20 py-6"
                  >
                    <div>
                      <h4 className="text-2xl font-bold tracking-[-0.025em]">
                        {detail ? (
                          <Link
                            href={servicePath(detail)}
                            className="hover:text-rust"
                          >
                            {service.name}
                          </Link>
                        ) : (
                          service.name
                        )}
                      </h4>
                      <p className="mt-2 max-w-[460px] text-base/[1.55] text-graphite">
                        {price.note}
                      </p>
                    </div>
                    <dl className="flex flex-col">
                      {price[market].map((option) => (
                        <div
                          key={option.label}
                          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/10 py-2 last:border-b-0"
                        >
                          <dt className="text-base text-graphite">
                            {option.label}
                          </dt>
                          <dd className="text-xl font-bold tracking-[-0.02em]">
                            {formatPrice(market, option)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
