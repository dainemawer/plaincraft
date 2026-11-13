import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/site/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "You're subscribed",
  robots: { index: false, follow: true },
};

export default function NewsletterConfirmedPage() {
  return (
    <ProsePage
      path="/newsletter/confirmed"
      title="You're subscribed."
      description={`Thanks for confirming. The ${site.name} newsletter arrives about twice a month, and every issue has a one-click unsubscribe link.`}
      crumb="Newsletter"
      cta
    >
      <p>
        While you wait for the first issue, the <Link href="/blog">blog</Link>{" "}
        has practical guides, and the <Link href="/pricing">pricing page</Link>{" "}
        lists every fixed fee.
      </p>
    </ProsePage>
  );
}
