import { ButtonLink } from "@/components/ui/button-link";
import { heroChecks } from "@/content/home";
import { site } from "@/lib/site";
import { HeroVideo } from "./hero-video";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgb(232_73_42/0.10),transparent_70%)]"
      />
      <div className="shell relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(48px,6vw,80px)] pt-[clamp(48px,8vw,112px)] pb-[clamp(56px,7vw,96px)]">
        <div>
          <h1
            id="hero-title"
            data-hero=""
            className="text-display font-bold text-balance"
          >
            You know you need AI. Here's where to start.
          </h1>
          <p
            data-hero=""
            style={{ "--hero-index": 1 }}
            className="mt-7 max-w-[560px] text-lede text-graphite text-pretty"
          >
            In one free 30-minute call, I'll show you where AI could save your
            business time and money. Plain English, no jargon and no sales
            pitch. {site.name} is an independent AI consultancy for South
            African SMEs.
          </p>
          <div
            data-hero=""
            style={{ "--hero-index": 2 }}
            className="mt-9 flex flex-wrap gap-3"
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
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-graphite"
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

        <figure
          id="video"
          data-hero=""
          style={{ "--hero-index": 4 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bottom-[46px] translate-3 bg-ember"
          />
          <HeroVideo videoUrl={site.heroVideoUrl} />
          <figcaption className="relative mt-[26px] flex flex-wrap justify-between gap-x-5 gap-y-2 text-[15px] text-graphite">
            <span>
              <strong className="font-semibold text-ink">Watch first:</strong>{" "}
              what AI can actually do for a business like yours
            </span>
            <span>2 min</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
