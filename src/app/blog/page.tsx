import { BlogListing } from "@/components/blog/blog-listing";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Short, practical guides on where AI helps, where it doesn't and how to start. No jargon, no hype, written for South African SMEs.";

export const metadata = pageMetadata({
  title: "AI for Small Business: Practical Guides",
  description,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <BlogListing
      title="AI, explained for people running a business."
      lede={description}
      description={description}
    />
  );
}
