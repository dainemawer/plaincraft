import { shortVersion } from "@/content/home";
import { site } from "@/lib/site";

/** A quotable summary for people, search engines and answer engines alike. */
export function ShortVersion() {
  return (
    <section aria-labelledby="summary-title" className="shell section-y">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(32px,5vw,72px)]">
        <h2
          id="summary-title"
          data-reveal=""
          className="text-heading-sm font-bold text-balance"
        >
          {site.name}, the short version.
        </h2>
        <dl
          data-reveal=""
          data-reveal-delay={120}
          className="border-t border-ink"
        >
          {shortVersion.map((item) => (
            <div
              key={item.term}
              className="grid grid-cols-[minmax(110px,0.4fr)_minmax(0,1fr)] gap-5 border-b border-ink/15 py-5"
            >
              <dt className="pt-[3px] text-[13px] text-graphite">
                {item.term}
              </dt>
              <dd className="text-lg/[1.5]">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
