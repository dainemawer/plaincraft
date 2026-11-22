import Link from "next/link";
import { ProsePage } from "@/components/site/prose-page";
import { industries, industryPath } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const path = "/industries";
const title = "AI by industry";
const description = `Where AI helps first in your sector, the POPIA points that apply to it, and where to start. Practical playbooks from ${site.name}.`;

export const metadata = pageMetadata({
  title: "AI for South African businesses, by industry",
  description,
  path,
});

export default function IndustriesPage() {
  return (
    <ProsePage
      type="CollectionPage"
      path={path}
      title={title}
      description={description}
      cta
    >
      <ul>
        {industries.map((industry) => (
          <li key={industry.slug}>
            <Link href={industryPath(industry)}>
              <strong>{industry.name}</strong>
            </Link>
            : {industry.lede}
          </li>
        ))}
      </ul>
      <p>
        Don&rsquo;t see your sector? Most of what AI does well in a small
        business is the same everywhere: writing, reading documents and
        answering routine questions.{" "}
        <Link href="/blog/what-ai-can-do-for-a-small-business">
          What AI can actually do for a 20-person business
        </Link>{" "}
        is a good place to start.
      </p>
    </ProsePage>
  );
}
