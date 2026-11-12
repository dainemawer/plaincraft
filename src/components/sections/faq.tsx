import { faqs } from "@/content/home";
import { events, track } from "@/lib/analytics";
import { site } from "@/lib/site";

type FaqProps = {
  title?: string;
  items?: { question: string; answer: string }[];
};

export function Faq({
  title = "Questions, answered straight.",
  items = faqs,
}: FaqProps) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-ink/12 bg-sand"
    >
      <div className="shell section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(32px,5vw,80px)]">
        <div data-reveal="" className="sticky top-[110px]">
          <h2 id="faq-title" className="text-heading font-bold text-balance">
            {title}
          </h2>
          <p className="mt-5 text-[17px]/[1.55] text-graphite">
            Something not covered?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline hover:text-rust"
              {...track(events.email, "faq")}
            >
              {site.email}
            </a>
          </p>
        </div>

        <div
          data-reveal=""
          data-reveal-delay={100}
          className="border-t border-ink"
        >
          {items.map((faq, index) => (
            <details
              key={faq.question}
              open={index === 0}
              className="border-b border-ink/20"
            >
              <summary className="flex min-h-11 items-center justify-between gap-5 py-[22px]">
                <h3 className="text-[clamp(18px,1.6vw,21px)] font-semibold tracking-[-0.02em]">
                  {faq.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none text-rust"
                >
                  +
                </span>
              </summary>
              <p className="mb-6 max-w-[620px] text-[17px]/[1.6] text-graphite">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
