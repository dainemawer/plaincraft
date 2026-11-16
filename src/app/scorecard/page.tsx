import Link from "next/link";
import { StepTracker } from "@/components/scorecard/step-tracker";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { areas, QUESTION_COUNT, scorecardQuestions } from "@/content/scorecard";
import { pageMetadata } from "@/lib/metadata";
import { type Crumb, prosePageStructuredData } from "@/lib/structured-data";

const path = "/scorecard";
const title = "AI readiness scorecard";
const description = `Ten questions, about three minutes. Get a score out of 100 for how ready your business is for AI, across processes, data, people and governance, with the next steps that matter for you.`;

export const metadata = pageMetadata({
  title: "AI Readiness Scorecard for South African SMEs · Free",
  description,
  path,
  socialTitle: "How ready is your business for AI? Score it in 3 minutes.",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Scorecard", path },
];

const formId = "scorecard";

export default function ScorecardPage() {
  return (
    <>
      <JsonLd
        data={prosePageStructuredData({
          type: "WebPage",
          path,
          name: title,
          description,
          trail,
        })}
      />
      <header className="shell pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)]">
        <Breadcrumb trail={trail} />
        <h1 className="max-w-[900px] text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
          How ready is your business for AI?
        </h1>
        <p className="mt-6 max-w-[640px] text-lede text-graphite text-pretty">
          {description} Free, no signup.
        </p>
        <ul className="mt-8 grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] border-t border-l border-ink">
          {Object.values(areas).map((area) => (
            <li
              key={area.label}
              className="border-r border-b border-ink p-[clamp(16px,2vw,24px)]"
            >
              <h2 className="text-lg font-bold tracking-[-0.02em]">
                {area.label}
              </h2>
              <p className="mt-1.5 text-[15px]/[1.5] text-graphite">
                {area.summary}
              </p>
            </li>
          ))}
        </ul>
      </header>

      <section
        aria-labelledby="questions-title"
        className="border-t border-ink/12 bg-sand"
      >
        <div className="shell py-[clamp(48px,6vw,88px)]">
          <h2 id="questions-title" className="sr-only">
            Questions
          </h2>
          <form
            id={formId}
            action="/scorecard/result"
            method="get"
            className="flex max-w-[760px] flex-col gap-10"
          >
            {scorecardQuestions.map((question, index) => (
              <fieldset key={question.id} className="border-t border-ink pt-6">
                <legend className="float-left w-full text-[clamp(1.25rem,2.2vw,1.5rem)] leading-tight font-bold tracking-[-0.02em] text-balance">
                  <span className="mr-2 text-graphite">{index + 1}.</span>
                  {question.question}
                </legend>
                <div className="clear-both flex flex-col gap-2 pt-4">
                  {question.answers.map((answer, points) => (
                    <label
                      key={answer}
                      className="flex min-h-11 cursor-pointer items-start gap-3 border border-ink/20 bg-cream px-4 py-3 text-base/[1.45] transition-colors hover:border-ink has-checked:border-ink has-checked:bg-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ember"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={points}
                        required
                        className="mt-1 size-4 shrink-0 accent-ink"
                      />
                      <span>{answer}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink pt-8">
              <button
                type="submit"
                className="min-h-[52px] cursor-pointer bg-ink px-[26px] py-[17px] text-base font-semibold text-paper transition-colors hover:bg-ember hover:text-ink"
              >
                See my score →
              </button>
              <p
                id={`${formId}-progress`}
                aria-live="polite"
                className="text-sm text-graphite"
              >
                {QUESTION_COUNT} questions
              </p>
            </div>
            <p className="text-sm/[1.55] text-graphite">
              Your answers aren't stored. The result page link carries them, so
              you can share it or come back to it. See the{" "}
              <Link
                href="/privacy"
                className="text-ink underline hover:text-rust"
              >
                privacy notice
              </Link>
              .
            </p>
          </form>
          <StepTracker formId={formId} total={QUESTION_COUNT} />
        </div>
      </section>
    </>
  );
}
