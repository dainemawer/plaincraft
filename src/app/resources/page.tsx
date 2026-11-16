import Link from "next/link";
import { ProsePage } from "@/components/site/prose-page";
import { resourceList } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";

const path = "/resources";
const title = "Free AI resources for South African SMEs";
const description =
  "Free, practical tools for South African businesses getting started with AI: a readiness scorecard, a POPIA + AI checklist and an AI usage policy template.";

export const metadata = pageMetadata({ title, description, path });

const items = [
  {
    path: "/scorecard",
    title: "AI readiness scorecard",
    description:
      "Ten questions, three minutes. A score out of 100 across processes, data, people and governance, with next steps.",
  },
  ...resourceList.map((resource) => ({
    path: resource.path,
    title: resource.title,
    description: resource.summary,
  })),
];

export default function ResourcesPage() {
  return (
    <ProsePage
      type="CollectionPage"
      path={path}
      title={title}
      description={description}
      crumb="Resources"
      cta
    >
      <p>
        Everything here is free to read online, with no signup. Each one can
        also be printed, downloaded or emailed to you.
      </p>
      {items.map((item) => (
        <section key={item.path}>
          <h2>
            <Link href={item.path}>{item.title}</Link>
          </h2>
          <p>{item.description}</p>
        </section>
      ))}
    </ProsePage>
  );
}
