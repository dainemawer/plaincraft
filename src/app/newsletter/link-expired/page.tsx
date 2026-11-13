import type { Metadata } from "next";
import { ProsePage } from "@/components/site/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "That link didn't work",
  robots: { index: false, follow: true },
};

export default function NewsletterLinkExpiredPage() {
  return (
    <ProsePage
      path="/newsletter/link-expired"
      title="That link didn't work."
      description="Confirmation links expire after seven days, and each one only works for the address it was sent to."
      crumb="Newsletter"
    >
      <p>
        Sign up again with the form at the bottom of any page and I'll send a
        fresh link. If it keeps happening, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> and I'll add you
        myself.
      </p>
    </ProsePage>
  );
}
