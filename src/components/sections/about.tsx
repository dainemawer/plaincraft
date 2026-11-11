import { ButtonLink } from "@/components/ui/button-link";
import { Photo } from "@/components/ui/photo";
import { founderFacts } from "@/content/home";
import { site } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="shell section-y"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(40px,6vw,96px)]">
        <div
          data-reveal=""
          className="relative aspect-[4/5] w-full max-w-[520px]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-3.5 bg-ember"
          />
          <div className="relative size-full border border-ink bg-sand">
            <Photo
              hint="Drop your headshot here: natural light, looking at camera"
              sizes="(min-width: 1100px) 520px, 100vw"
            />
          </div>
        </div>

        <div data-reveal="" data-reveal-delay={120}>
          <h2 id="about-title" className="text-heading font-bold text-balance">
            Just me. That's the point.
          </h2>
          <p className="mt-7 text-[19px]/[1.6] text-pretty">
            I'm <strong>{site.founder.name}</strong>, founder of {site.name}.
            I've spent 17 years building websites and digital products, most
            recently as a Staff Engineer leading web engineering on large client
            projects. AI is part of how I work every day, so I know where it
            earns its keep and where it quietly makes a mess.
          </p>
          <p className="mt-[18px] text-[17px]/[1.6] text-graphite text-pretty">
            I started {site.name} because small businesses were being sold AI
            the same way enterprises are: big decks, long contracts, vague
            outcomes. SMEs need something different. Someone senior who learns
            how the business really works, builds what pays back, and then gets
            out of the way.
          </p>
          <dl className="mt-8 border-t border-ink/15">
            {founderFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex gap-4 border-b border-ink/15 py-3.5 text-base"
              >
                <dt className="min-w-24 pt-0.5 text-[13px] text-graphite">
                  {fact.label}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={site.linkedInUrl}
              variant="outline-strong"
              size="compact"
              icon="↗"
              rel="me noopener noreferrer"
              target="_blank"
            >
              Connect on LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
