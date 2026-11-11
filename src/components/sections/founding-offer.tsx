import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/lib/site";

export function FoundingOffer() {
  return (
    <section
      aria-labelledby="founding-title"
      className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,9vw,128px)]"
    >
      <div
        data-reveal=""
        className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-16 gap-y-8 bg-ember p-[clamp(32px,5vw,64px)] text-ink"
      >
        <h2
          id="founding-title"
          className="text-heading-sm font-bold text-balance"
        >
          I'm taking on five founding clients for 2027.
        </h2>
        <div>
          <p className="text-lg/[1.55] text-pretty">
            You get my full attention and founding-client terms. In return, once
            we've delivered results you're happy with, I'll ask to write the
            work up as a case study. Only with your sign-off.
          </p>
          <ButtonLink
            href={site.calendarUrl}
            variant="dark"
            lift
            className="mt-6"
          >
            Apply for a founding spot
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
