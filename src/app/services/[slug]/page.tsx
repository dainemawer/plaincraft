import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuditSample } from "@/components/sections/audit-sample";
import { BookCall } from "@/components/sections/book-call";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ButtonLink } from "@/components/ui/button-link";
import { Photo } from "@/components/ui/photo";
import { services } from "@/content/home";
import {
  type ServiceDetail,
  serviceDetailById,
  serviceDetails,
  servicePath,
  serviceStage,
} from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import type { Crumb } from "@/lib/structured-data";
import { servicePageStructuredData } from "@/lib/structured-data";

const findService = (slug: string) =>
  serviceDetails.find((detail) => detail.slug === slug);

export function generateStaticParams() {
  return serviceDetails.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const detail = findService((await params).slug);
  if (!detail) return {};
  return pageMetadata({
    title: detail.title,
    description: detail.description,
    path: servicePath(detail),
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const detail = findService((await params).slug);
  if (!detail) notFound();

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: detail.name, path: servicePath(detail) },
  ];

  return (
    <>
      <JsonLd data={servicePageStructuredData(detail, trail)} />
      <ServiceHero detail={detail} trail={trail} />
      <Fit detail={detail} />
      <Deliverables detail={detail} />
      <Process detail={detail} />
      {detail.showSample ? <Sample /> : null}
      <Price detail={detail} />
      <Faq title={detail.faqTitle} items={detail.faqs} />
      <Related detail={detail} />
      <BookCall
        title="Start with a free 30-minute call."
        note={detail.ctaNote}
      />
    </>
  );
}

function ServiceHero({
  detail,
  trail,
}: {
  detail: ServiceDetail;
  trail: Crumb[];
}) {
  return (
    <section aria-labelledby="svc-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgb(232_73_42/0.10),transparent_70%)]"
      />
      <div className="shell relative pt-[clamp(40px,6vw,80px)] pb-[clamp(48px,6vw,88px)]">
        <Breadcrumb trail={trail} className="mb-8" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,6vw,80px)]">
          <div>
            <p
              data-hero=""
              className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]"
            >
              <span className="bg-ember px-[9px] py-[5px] font-medium">
                {serviceStage(detail.id)}
              </span>
              {detail.note ? (
                <span className="text-graphite">{detail.note}</span>
              ) : null}
            </p>
            <h1
              id="svc-title"
              data-hero=""
              style={{ "--hero-index": 1 }}
              className="text-[clamp(2.75rem,6.4vw,5.6rem)] leading-[0.96] font-bold tracking-[-0.045em] text-balance"
            >
              {detail.headline}
            </h1>
            <p
              data-hero=""
              style={{ "--hero-index": 2 }}
              className="mt-7 max-w-[560px] text-lede text-graphite text-pretty"
            >
              {detail.lede}
            </p>
            <div
              data-hero=""
              style={{ "--hero-index": 3 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <ButtonLink href={site.calendarUrl} lift>
                Start with a free call
              </ButtonLink>
              <ButtonLink
                href={detail.showSample ? "#sample" : "#included"}
                variant="outline"
                icon={null}
              >
                {detail.showSample ? "See a sample result" : "What's included"}
              </ButtonLink>
            </div>
          </div>
          <figure
            data-hero=""
            style={{ "--hero-index": 2 }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-ember"
            />
            <div className="relative aspect-[4/3] border border-ink bg-sand">
              <Photo
                src={detail.photo.src}
                alt={detail.photo.alt}
                sizes="(min-width: 1100px) 600px, 100vw"
                preload
              />
            </div>
          </figure>
        </div>
      </div>
      <dl
        data-reveal=""
        className="shell relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] pb-[clamp(48px,6vw,80px)]"
      >
        {detail.facts.map((fact) => (
          <div key={fact.label} className="border-t border-ink py-5 pr-6">
            <dt className="text-[13px] text-graphite">{fact.label}</dt>
            <dd className="mt-1.5 text-[22px] font-bold tracking-[-0.02em]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Fit({ detail }: { detail: ServiceDetail }) {
  return (
    <section
      aria-labelledby="fit-title"
      className="border-t border-ink/12 bg-sand"
    >
      <div className="shell py-[clamp(64px,9vw,112px)]">
        <h2
          id="fit-title"
          data-reveal=""
          className="mb-[clamp(32px,4vw,56px)] max-w-[760px] text-heading font-bold text-balance"
        >
          Is this right for you?
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border-t border-l border-ink">
          <div
            data-reveal=""
            className="border-r border-b border-ink bg-paper p-[clamp(24px,3vw,40px)]"
          >
            <h3 className="mb-5 text-2xl font-bold tracking-[-0.025em]">
              A good fit if…
            </h3>
            <ul className="flex flex-col gap-3.5 text-[17px]/[1.5]">
              {detail.goodFit.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[22px_minmax(0,1fr)] gap-2"
                >
                  <span aria-hidden="true" className="font-bold text-rust">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-reveal=""
            data-reveal-delay={100}
            className="border-r border-b border-ink bg-paper p-[clamp(24px,3vw,40px)]"
          >
            <h3 className="mb-5 text-2xl font-bold tracking-[-0.025em]">
              Probably not if…
            </h3>
            <ul className="flex flex-col gap-3.5 text-[17px]/[1.5] text-graphite">
              {detail.notFit.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[22px_minmax(0,1fr)] gap-2"
                >
                  <span aria-hidden="true" className="font-bold">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-ink/15 pt-4 text-[15px]/[1.5]">
              Unsure?{" "}
              <a href={site.calendarUrl} className="underline hover:text-rust">
                Ask on the free call
              </a>
              . I'll tell you honestly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Deliverables({ detail }: { detail: ServiceDetail }) {
  return (
    <section aria-labelledby="get-title" className="shell section-y">
      <div
        data-reveal=""
        className="mb-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-[72px] gap-y-5"
      >
        <h2 id="get-title" className="text-heading font-bold text-balance">
          What you get at the end.
        </h2>
        <p className="max-w-[520px] text-lg/[1.55] text-graphite text-pretty">
          {detail.deliverables.intro}
        </p>
      </div>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-l border-ink">
        {detail.deliverables.items.map((item, index) => (
          <li
            key={item.title}
            data-reveal=""
            data-reveal-delay={index * 80}
            className="flex flex-col gap-3 border-r border-b border-ink p-[clamp(24px,3vw,32px)]"
          >
            <span
              aria-hidden="true"
              className="text-[15px] font-semibold text-rust"
            >
              {index + 1}
            </span>
            <h3 className="text-[22px] font-bold tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="text-base/[1.55] text-graphite">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Process({ detail }: { detail: ServiceDetail }) {
  return (
    <section aria-labelledby="run-title" className="bg-ink text-paper">
      <div className="shell section-y">
        <h2
          id="run-title"
          data-reveal=""
          className="mb-[clamp(40px,5vw,64px)] max-w-[760px] text-heading font-bold text-balance"
        >
          {detail.process.title}
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(28px,3vw,40px)]">
          {detail.process.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal=""
              data-reveal-delay={index * 100}
              className="flex flex-col gap-3 border-t-2 border-paper pt-6"
            >
              <span className="text-[15px] font-semibold text-ember">
                {step.when}
              </span>
              <h3 className="text-[22px] font-bold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-base/[1.55] text-mist">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Sample() {
  return (
    <section
      id="sample"
      aria-labelledby="sample-title"
      className="shell section-y"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,80px)]">
        <div data-reveal="">
          <h2 id="sample-title" className="text-heading font-bold text-balance">
            What the result looks like.
          </h2>
          <p className="mt-6 max-w-[480px] text-lg/[1.55] text-graphite text-pretty">
            Each process gets a clear verdict. You'll see the hours at stake and
            what I'd do about it, including the honest “not for AI”.
          </p>
        </div>
        <AuditSample />
      </div>
    </section>
  );
}

function Price({ detail }: { detail: ServiceDetail }) {
  return (
    <section
      id="included"
      aria-labelledby="price-title"
      className={`shell pb-[clamp(64px,9vw,128px)] ${detail.showSample ? "" : "pt-[clamp(64px,9vw,128px)]"}`}
    >
      <div
        data-reveal=""
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border border-ink"
      >
        <div className="flex flex-col gap-4 bg-ember p-[clamp(28px,4vw,56px)]">
          <h2 id="price-title" className="text-heading-sm font-bold">
            One fixed fee.
          </h2>
          <p className="max-w-[400px] text-base/[1.55]">
            Quoted in writing after a free call, based on the size of your team
            and the scope we agree. No day rates, no surprise invoices.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-5 bg-paper p-[clamp(28px,4vw,56px)]">
          <h3 className="sr-only">What's included</h3>
          <ul className="flex flex-col border-t border-ink/15">
            {detail.included.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-ink/15 py-3.5 text-[17px]"
              >
                <span aria-hidden="true" className="font-bold text-rust">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={site.calendarUrl} lift className="self-start">
            Get a quote on a free call
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Related({ detail }: { detail: ServiceDetail }) {
  const related = detail.next
    .map((id) => serviceDetailById.get(id))
    .filter((item): item is ServiceDetail => Boolean(item));

  return (
    <section
      aria-labelledby="next-title"
      className="shell py-[clamp(64px,8vw,112px)]"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2
          id="next-title"
          data-reveal=""
          className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-bold tracking-[-0.035em]"
        >
          What often comes next
        </h2>
        <Link
          href="/services"
          className="text-base font-semibold underline underline-offset-[5px] hover:text-rust"
        >
          All services{" "}
          <span aria-hidden="true" className="glyph">
            →
          </span>
        </Link>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-l border-ink">
        {related.map((item) => (
          <li key={item.id} className="border-r border-b border-ink">
            <Link
              href={servicePath(item)}
              className="flex h-full flex-col gap-2.5 p-[clamp(24px,3vw,32px)] text-ink no-underline transition-colors duration-300 hover:bg-sand"
            >
              <span className="text-[13px] text-rust">
                {serviceStage(item.id)}
              </span>
              <h3 className="text-[22px] font-bold tracking-[-0.02em]">
                {item.name}
              </h3>
              <p className="text-base/[1.55] text-graphite">
                {services.find((service) => service.id === item.id)?.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
