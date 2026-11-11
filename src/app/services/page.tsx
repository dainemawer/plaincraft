import Link from "next/link";
import { ProsePage } from "@/components/site/prose-page";
import { serviceStages } from "@/content/home";
import { serviceDetailById, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const title = "AI consulting services for South African SMEs";
const description = `Seven fixed-fee services, from an AI readiness audit to automation builds, training and a fractional Head of AI. ${site.name} works with businesses of 10–250 staff across South Africa.`;

export const metadata = pageMetadata({
  title: "AI Consulting Services for SMEs",
  description,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <ProsePage
      type="CollectionPage"
      path="/services"
      title={title}
      description={description}
      crumb="Services"
      cta
    >
      <p>
        Most clients start with an audit, but you can bring me in at any stage.
        Each engagement is scoped and priced in writing before work starts.
      </p>
      {serviceStages.map((stage) => (
        <section key={stage.stage} aria-labelledby={`${stage.stage}-title`}>
          <h2 id={`${stage.stage}-title`}>
            {stage.stage}: {stage.label}
          </h2>
          <ul>
            {stage.services.map((service) => {
              const detail = serviceDetailById.get(service.id);
              return (
                <li key={service.id}>
                  {detail ? (
                    <Link href={servicePath(detail)}>{service.name}</Link>
                  ) : (
                    service.name
                  )}
                  : {service.body}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </ProsePage>
  );
}
