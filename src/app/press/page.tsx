import founderPhoto from "@/assets/images/daine-mawer.jpg";
import { ProsePage } from "@/components/site/prose-page";
import { foundingDiscount } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const path = "/press";
const title = "Press and media";
const description = `Facts, bios, images and story angles for journalists writing about ${site.name}, an independent AI consultancy for South African SMEs.`;

export const metadata = pageMetadata({
  title: `Press kit · ${site.name}`,
  description,
  path,
});

const releaseDate = "2026-11-24";
const discount = `${foundingDiscount * 100}%`;

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

const mediaMailto = `mailto:${site.email}?subject=${encodeURIComponent("Media enquiry")}`;

export default function PressPage() {
  return (
    <ProsePage path={path} title={title} description={description}>
      <p>
        For interviews, comment or anything not covered here, email{" "}
        <a href={mediaMailto}>{site.email}</a> with &ldquo;Media&rdquo; in the
        subject. I&rsquo;m {site.founder.name}, and I answer these myself.
      </p>

      <h2>At a glance</h2>
      <ul>
        <li>
          <strong>What:</strong> an independent AI consultancy. Readiness
          audits, strategy, automation, staff training, AI policy and a
          fractional Head of AI.
        </li>
        <li>
          <strong>Who for:</strong> South African businesses with 10 to 250
          staff.
        </li>
        <li>
          <strong>Founder:</strong> {site.founder.name}, {site.founder.jobTitle}
        </li>
        <li>
          <strong>Based in:</strong> {site.founder.location}. Works remotely
          nationwide.
        </li>
        <li>
          <strong>How it works:</strong> one senior consultant on every
          engagement, fixed fees quoted in writing, and{" "}
          <a href="/pricing">prices published on the site</a>.
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href="/">{site.url.replace(/^https?:\/\//, "")}</a>
        </li>
      </ul>

      <h2>Latest news</h2>
      <h3>
        Cape Town AI consultancy opens five fixed-fee founding spots for South
        African SMEs
      </h3>
      <p>
        <time dateTime={releaseDate}>{formatDate(releaseDate)}</time> · Cape
        Town
      </p>
      <p>
        {site.name}, an independent AI consultancy for South African small and
        medium-sized businesses, is taking on five founding clients for 2027.
        Each gets {discount} off their first engagement. In return, once
        they&rsquo;re happy with the results, {site.name} will ask to write the
        work up as a case study, only with the client&rsquo;s sign-off.
      </p>
      <p>
        {site.name} works with businesses of 10 to 250 staff that want to use AI
        but don&rsquo;t know where to start, or have already bought tools their
        teams don&rsquo;t use. Every engagement has a fixed fee, and the prices
        are published: a two-week AI readiness audit starts at R45,000, and
        staff training starts at R20,000 for a half-day workshop. Clients own
        everything that&rsquo;s built for them.
      </p>
      <p>
        Data protection is part of the work, not an extra. Every audit includes
        a check of how staff use AI tools with personal information under POPIA,
        and {site.name} publishes a free{" "}
        <a href="/resources/popia-ai-checklist">POPIA and AI checklist</a> and{" "}
        <a href="/resources/ai-usage-policy-template">
          AI usage policy template
        </a>{" "}
        for any business to use.
      </p>
      <p>
        Businesses can apply for a founding spot or book a free 30-minute call
        at {site.url.replace(/^https?:\/\//, "")}.
      </p>

      <h2>About {site.name}</h2>
      <p>
        {site.name} is an independent AI consultancy for South African small and
        medium-sized businesses, based in Cape Town. It helps businesses with 10
        to 250 staff find where AI saves time and money, then builds it
        properly: readiness audits, automation, staff training, AI policy and
        POPIA-aligned data handling. Every engagement is led by one senior
        consultant and has a fixed fee. {site.name} takes no referral fees from
        software vendors.
      </p>

      <h2>About {site.founder.name}</h2>
      <p>
        <strong>Short:</strong> {site.founder.name} is the founder of{" "}
        {site.name}, an independent AI consultancy for South African SMEs, after
        17 years building websites and digital products.
      </p>
      <p>
        <strong>Longer:</strong> {site.founder.name} founded {site.name} to give
        South African small businesses practical, fixed-fee help with AI. Before
        that came 17 years building websites and digital products, most recently
        as a Staff Engineer leading web engineering on large client projects. AI
        is part of {site.founder.name}&rsquo;s own work every day, and the focus
        is on where it saves real time and money, and where it doesn&rsquo;t.
        Based in Cape Town.
      </p>

      <h2>Story angles</h2>
      <p>Topics I can comment on, with South African examples:</p>
      <ul>
        <li>
          Unused AI licences: why businesses pay for ChatGPT or Copilot seats
          their staff don&rsquo;t use, and what fixes it.
        </li>
        <li>
          POPIA and AI at work: what happens when staff paste client information
          into AI tools, and the simple rules that prevent it.
        </li>
        <li>
          What AI really costs a small business, from tools to consultants.
        </li>
        <li>
          Which admin jobs a 20-person business can hand to AI first, and which
          it shouldn&rsquo;t.
        </li>
      </ul>

      <h2>Images and logo</h2>
      <ul>
        <li>
          <a href={founderPhoto.src} download="daine-mawer-plaincraft.jpg">
            Headshot of {site.founder.name}
          </a>{" "}
          (JPG, {founderPhoto.width} × {founderPhoto.height})
        </li>
        <li>
          <a href="/icon.svg" download="plaincraft-mark.svg">
            {site.name} logo mark
          </a>{" "}
          (SVG)
        </li>
      </ul>
      <p>
        Free to use in coverage of {site.name}. Please credit the headshot
        &ldquo;{site.name}&rdquo;.
      </p>
    </ProsePage>
  );
}
