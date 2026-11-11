import Link from "next/link";
import { ProsePage } from "@/components/site/prose-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const title = `Contact ${site.name}`;
const description = `Book a free 30-minute call or email ${site.email}. ${site.name} works with SMEs across South Africa.`;

export const metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <ProsePage
      type="ContactPage"
      path="/contact"
      title={title}
      description={description}
    >
      <h2>Book a free call</h2>
      <p>
        The quickest way to start is a{" "}
        <a href={site.calendarUrl}>free 30-minute video call</a>. Pick any open
        slot. We'll talk about your business, I'll show you where AI fits and
        where it doesn't, and you'll leave with clear next steps, whether or not
        we work together. You don't need to prepare anything.
      </p>

      <h2>Email</h2>
      <p>
        Write to <a href={`mailto:${site.email}`}>{site.email}</a>. Every
        message comes straight to me, {site.founder.name}. It helps to include:
      </p>
      <ul>
        <li>what your business does and roughly how many people work there</li>
        <li>the work that takes up too much of your team's time</li>
        <li>any AI tools you already use or have tried</li>
      </ul>

      <h2>Elsewhere</h2>
      <ul>
        <li>
          LinkedIn: <a href={site.linkedInUrl}>{site.founder.name}</a>
        </li>
        <li>
          Personal site: <a href={site.founder.url}>dainemawer.com</a>
        </li>
      </ul>

      <h2>Where I work</h2>
      <p>
        {site.name} is based in {site.founder.location} and works remotely with
        businesses across South Africa. International clients are welcome where
        time zones allow.
      </p>

      <h2>Your information</h2>
      <p>
        Anything you send is handled under the{" "}
        <Link href="/privacy">privacy &amp; POPIA notice</Link>, and isn't used
        to train third-party AI models without your consent.
      </p>
    </ProsePage>
  );
}
