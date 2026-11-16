import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProsePage } from "@/components/site/prose-page";
import { ButtonLink } from "@/components/ui/button-link";
import { survey, surveyQuestions } from "@/content/survey";
import { events, track } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";

const path = "/survey";
const title = "State of AI in South African SMEs 2027";
const description = `A ${survey.minutes}-minute anonymous survey of how South African businesses use AI, what they spend and what holds them back. Every respondent can get the full report.`;

const live = survey.tallyUrl !== "";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "AI in South African SMEs: 2027 survey",
    description,
    path,
  }),
  // Out of the index until the form is live.
  ...(live ? {} : { robots: { index: false, follow: true } }),
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", { dateStyle: "long" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

/** "https://tally.so/r/abc123" → "https://tally.so/embed/abc123?…" */
const embedUrl = (shareUrl: string) =>
  `${shareUrl.replace("/r/", "/embed/")}?alignLeft=1&hideTitle=1&transparentBackground=1`;

export default function SurveyPage() {
  // Hidden until the Tally form exists (see src/content/survey.ts).
  if (!live) notFound();

  return (
    <ProsePage
      path={path}
      title={title}
      description={description}
      crumb="Survey"
    >
      <p>
        South African businesses are being told AI will change everything, but
        there is very little local data on what is actually happening: which
        tools people use, what they pay, whether it helps, and what gets in the
        way. This survey is an attempt to find out.
      </p>
      <ul>
        <li>
          <strong>{surveyQuestions.length} questions</strong>, about{" "}
          {survey.minutes} minutes. Mostly multiple choice.
        </li>
        <li>
          <strong>Anonymous.</strong> No name or company. Only totals are
          published, and groups smaller than {survey.minGroupSize} are never
          shown.
        </li>
        <li>
          <strong>Open until {formatDate(survey.closes)}.</strong> The report
          comes out by {formatDate(survey.reportDue)}. Leave your email at the
          end if you'd like a copy.
        </li>
      </ul>

      {live ? (
        <>
          <h2 id="take-the-survey">Take the survey</h2>
          <iframe
            src={embedUrl(survey.tallyUrl)}
            title={title}
            loading="lazy"
            className="mt-6 h-[1400px] w-full border-0"
          />
          <p>
            Form not loading?{" "}
            <a
              href={survey.tallyUrl}
              {...track(events.surveyOpen, "survey-page")}
            >
              Open the survey in a new tab
            </a>
            .
          </p>
          <ButtonLink
            href={survey.tallyUrl}
            className="mt-6"
            icon="↗"
            {...track(events.surveyOpen, "survey-page-button")}
          >
            Open the survey
          </ButtonLink>
        </>
      ) : (
        <p>
          <strong>The survey opens shortly.</strong> Check back in a day or two,
          or <a href="#footer-newsletter">join the newsletter</a> to hear when
          it's live and when the results are out.
        </p>
      )}

      <h2>What we ask</h2>
      <ol>
        {surveyQuestions.map((question) => (
          <li key={question.id}>{question.title}</li>
        ))}
      </ol>

      <h2>Who runs it, and your data</h2>
      <p>
        The survey is run by Plaincraft, an independent AI consultancy in Cape
        Town. Answers are collected with Tally, which stores them in the EU, and
        are deleted 12 months after the report is published. If you leave your
        email, it is used only to send you the report, unless you also tick the
        newsletter box. See the{" "}
        <Link href="/privacy">privacy &amp; POPIA notice</Link> for your rights.
      </p>

      <h2>While you're here</h2>
      <p>
        Want to know where your own business stands? The{" "}
        <Link href="/scorecard">AI readiness scorecard</Link> takes ten
        questions and gives you a score out of 100 with next steps.
      </p>
    </ProsePage>
  );
}
