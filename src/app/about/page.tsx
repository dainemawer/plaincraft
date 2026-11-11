import { ProsePage } from "@/components/site/prose-page";
import { founderFacts } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const title = `About ${site.name}`;
const description = `${site.name} is an independent AI consultancy for South African SMEs, run by ${site.founder.name} from Cape Town.`;

export const metadata = pageMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <ProsePage
      type="AboutPage"
      path="/about"
      title={title}
      description={description}
      cta
    >
      <h2>Who runs {site.name}</h2>
      <p>
        I'm <strong>{site.founder.name}</strong>, founder of {site.name}. I've
        spent 17 years building websites and digital products, most recently as
        a Staff Engineer leading web engineering on large client projects. AI is
        part of how I work every day, so I know where it earns its keep and
        where it quietly makes a mess.
      </p>
      <ul>
        {founderFacts.map((fact) => (
          <li key={fact.label}>
            <strong>{fact.label}:</strong> {fact.value}
          </li>
        ))}
      </ul>

      <h2>Why {site.name} exists</h2>
      <p>
        Small businesses are being sold AI the same way enterprises are: big
        decks, long contracts, vague outcomes. SMEs need something different.
        Someone senior who learns how the business really works, builds what
        pays back, and then gets out of the way.
      </p>

      <h2>How I work</h2>
      <ul>
        <li>
          <strong>One person, start to finish.</strong> You deal with me, not an
          account manager or a junior team.
        </li>
        <li>
          <strong>Fixed fees, in writing.</strong> Every engagement is scoped
          and priced before any work starts. There's no hourly billing.
        </li>
        <li>
          <strong>Independent advice.</strong> I take no referral fees, so tool
          recommendations are based only on what fits your business.
        </li>
        <li>
          <strong>No lock-in.</strong> Everything I build is documented and
          yours, so your team or another provider can run it without me.
        </li>
        <li>
          <strong>POPIA-aware by default.</strong> Your data stays in your own
          accounts wherever possible.
        </li>
      </ul>

      <h2>Who I work with</h2>
      <p>
        South African businesses with roughly 10 to 250 staff, working remotely
        nationwide and on site where it helps. If AI won't pay back for you,
        I'll say so on the first call.
      </p>

      <h2>Get in touch</h2>
      <p>
        The easiest first step is a{" "}
        <a href={site.calendarUrl}>free 30-minute call</a>. You can also email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or connect on{" "}
        <a href={site.linkedInUrl}>LinkedIn</a>.
      </p>
    </ProsePage>
  );
}
