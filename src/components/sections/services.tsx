import { serviceStages } from "@/content/home";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-t border-ink/12 bg-sand"
    >
      <div className="shell section-y">
        <div
          data-reveal=""
          className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6"
        >
          <h2
            id="services-title"
            className="max-w-[760px] text-heading font-bold text-balance"
          >
            Seven services, one through-line: understand, plan, then build.
          </h2>
          <p className="max-w-[360px] text-[17px]/[1.55] text-graphite">
            Start anywhere. Most clients begin with the audit, but you can bring
            me in at any stage.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] border-t border-l border-ink">
          {serviceStages.map((stage, index) => {
            const dark = stage.tone === "dark";
            return (
              <div
                key={stage.stage}
                data-reveal=""
                data-reveal-delay={index * 100}
                className={`flex flex-col gap-7 border-r border-b border-ink p-[clamp(24px,3vw,36px)] ${
                  dark ? "bg-ink text-paper" : "bg-paper"
                }`}
              >
                <p className="flex items-baseline justify-between text-[13px]">
                  <span>{stage.stage}</span>
                  <span className={dark ? "text-ember" : "text-rust"}>
                    {stage.label}
                  </span>
                </p>
                {stage.services.map((service) => (
                  <article
                    key={service.id}
                    id={service.id}
                    aria-labelledby={`${service.id}-title`}
                    className={`flex flex-col gap-2.5 border-t pt-6 ${
                      dark ? "border-paper/20" : "border-ink/15"
                    }`}
                  >
                    <h3
                      id={`${service.id}-title`}
                      className="text-2xl font-bold tracking-[-0.025em]"
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`text-base/[1.55] ${dark ? "text-mist" : "text-graphite"}`}
                    >
                      {service.body}
                    </p>
                  </article>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
