import { ButtonLink } from "@/components/ui/button-link";
import { heroChecks } from "@/content/home";
import { site } from "@/lib/site";
import { HeroBackdrop } from "./hero-backdrop";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <HeroBackdrop />
      <div className="shell relative pt-[clamp(56px,9vw,136px)] pb-[clamp(56px,8vw,112px)]">
        <p data-hero="" className="mb-6 text-[15px] font-semibold text-rust">
          AI consultant for South African small businesses
        </p>
        <h1
          id="hero-title"
          data-hero=""
          className="max-w-[1180px] text-display-hero font-bold text-balance"
        >
          You know you need AI. Here's where to start.
        </h1>

        <div className="mt-[clamp(32px,4vw,56px)] grid items-end gap-x-[clamp(48px,6vw,80px)] gap-y-9 border-t border-ink/15 pt-[clamp(28px,3vw,40px)] nav:grid-cols-[minmax(0,1fr)_auto]">
          <p
            data-hero=""
            style={{ "--hero-index": 1 }}
            className="max-w-[600px] text-lede text-graphite text-pretty"
          >
            In one free 30-minute call, I'll show you where AI could save your
            business time and money. Plain English, no jargon and no sales
            pitch. {site.name} is an independent AI consultancy for South
            African SMEs.
          </p>

          <div className="flex flex-col gap-7 nav:items-end">
            <div
              data-hero=""
              style={{ "--hero-index": 2 }}
              className="flex flex-wrap gap-3"
            >
              <ButtonLink href={site.calendarUrl} lift>
                Book your free call
              </ButtonLink>
              <ButtonLink href="/#what-ai-does" variant="outline" icon={null}>
                What can AI do for me?
              </ButtonLink>
            </div>
            <ul
              data-hero=""
              style={{ "--hero-index": 3 }}
              className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-graphite"
            >
              {heroChecks.map((check) => (
                <li key={check} className="flex items-center gap-2">
                  <span aria-hidden="true" className="font-bold text-rust">
                    ✓
                  </span>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
