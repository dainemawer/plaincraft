import { processSteps } from "@/content/home";
import { AuditSample } from "./audit-sample";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="shell section-y"
    >
      <div className="mb-[clamp(48px,6vw,88px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,80px)]">
        <div data-reveal="">
          <h2
            id="process-title"
            className="text-heading font-bold text-balance"
          >
            Four steps. You can stop after any of them.
          </h2>
          <p className="mt-6 max-w-[480px] text-lg/[1.55] text-graphite text-pretty">
            If we carry on after the call, the audit comes next. You get a
            one-page answer, not a 60-page report: what to automate, what to fix
            first and what to leave alone.
          </p>
        </div>
        <AuditSample />
      </div>

      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(28px,3vw,40px)]">
        {processSteps.map((step, index) => (
          <li
            key={step.number}
            data-reveal=""
            data-reveal-delay={index * 100}
            className="flex flex-col gap-3.5 border-t-2 border-ink pt-6"
          >
            <div className="flex items-baseline justify-between">
              <span
                aria-hidden="true"
                className="text-[56px] leading-none font-bold tracking-[-0.05em]"
              >
                {step.number}
              </span>
              <span
                className={
                  index === 0
                    ? "bg-ember px-2 py-1 text-xs"
                    : "text-xs text-graphite"
                }
              >
                {step.meta}
              </span>
            </div>
            <h3 className="mt-2 text-[22px] font-bold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="text-base/[1.55] text-graphite">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
