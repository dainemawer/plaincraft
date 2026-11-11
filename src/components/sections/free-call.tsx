import { ButtonLink } from "@/components/ui/button-link";
import { callAgenda } from "@/content/home";
import { site } from "@/lib/site";

export function FreeCall() {
  return (
    <section
      id="the-call"
      aria-labelledby="call-title"
      className="border-t border-ink/12 bg-sand"
    >
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,96px)] py-[clamp(64px,9vw,112px)]">
        <div data-reveal="">
          <h2 id="call-title" className="text-heading font-bold text-balance">
            What happens on the free call.
          </h2>
          <p className="mt-6 max-w-[480px] text-lg/[1.55] text-graphite text-pretty">
            Thirty minutes on video. You don't need to prepare anything or know
            anything about AI.
          </p>
          <ButtonLink href={site.calendarUrl} lift className="mt-8">
            Pick a time that suits you
          </ButtonLink>
        </div>

        <ol className="flex flex-col border-t border-ink">
          {callAgenda.map((item, index) => (
            <li
              key={item.time}
              data-reveal=""
              data-reveal-delay={index * 100}
              className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b border-ink/20 py-6"
            >
              <span className="pt-1 text-[15px] font-semibold text-rust">
                {item.time}
              </span>
              <div>
                <h3 className="text-[22px] font-bold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-base/[1.55] text-graphite">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
