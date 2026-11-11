import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ProsePage } from "@/components/site/prose-page";
import { serviceDetails, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
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

  const others = serviceDetails.filter((other) => other.id !== detail.id);

  return (
    <ProsePage
      path={servicePath(detail)}
      title={detail.headline}
      description={detail.intro}
      parents={[{ name: "Services", path: "/services" }]}
      crumb={detail.serviceType}
      cta
    >
      <JsonLd data={servicePageStructuredData(detail)} />

      <h2>Is this for you?</h2>
      <p>This is a good fit if:</p>
      <ul>
        {detail.forYouIf.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>What you get</h2>
      <ul>
        {detail.youGet.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>How it works</h2>
      <ol>
        {detail.howItWorks.map((item) => (
          <li key={item.step}>
            <strong>{item.step}.</strong> {item.detail}
          </li>
        ))}
      </ol>
      <p>
        Every engagement is fixed-fee and quoted in writing after a free
        30-minute call. You deal with me from start to finish.
      </p>

      <h2>Questions</h2>
      {detail.faqs.map((faq) => (
        <section key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </section>
      ))}

      <h2>Other services</h2>
      <ul>
        {others.map((other) => (
          <li key={other.id}>
            <Link href={servicePath(other)}>{other.headline}</Link>
          </li>
        ))}
      </ul>
    </ProsePage>
  );
}
