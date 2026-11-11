import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/lib/site";

type BookCallProps = {
  title?: string;
  note?: string;
};

/** Closing call to action used at the foot of most pages. */
export function BookCall({
  title = "Find out where AI fits in your business. In 30 minutes.",
  note = "Free and no obligation. You'll leave with clear next steps, even if we never work together.",
}: BookCallProps) {
  return (
    <section
      id="book"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_100%,rgb(232_73_42/0.22),transparent_70%)]"
      />
      <div className="shell relative py-[clamp(80px,11vw,160px)]">
        <h2
          id="cta-title"
          data-reveal=""
          className="max-w-[1100px] text-display-cta font-bold text-balance"
        >
          {title}
        </h2>
        <div
          data-reveal=""
          data-reveal-delay={120}
          className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <ButtonLink href={site.calendarUrl} variant="ember" size="lg" lift>
            Book your free call
          </ButtonLink>
          <p className="max-w-[380px] text-base/[1.5] text-mist">{note}</p>
        </div>
      </div>
    </section>
  );
}
