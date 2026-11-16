"use server";

import { track } from "@vercel/analytics/server";
import {
  areas,
  resultPath,
  type ScorecardResult,
  scoreResult,
} from "@/content/scorecard";
import { events } from "@/lib/analytics";
import {
  fromAddress,
  mailerReady,
  sendNewsletterConfirmation,
} from "@/lib/mailer";
import { isNewsletterSpam, parseEmail } from "@/lib/newsletter";
import { sendEmail } from "@/lib/resend";
import { absoluteUrl, site } from "@/lib/site";

export type ReportState =
  | { status: "idle" }
  | { status: "invalid"; email: string; reason: "email" | "consent" }
  | { status: "failed"; email: string }
  | { status: "sent"; newsletter: boolean };

function reportText(result: ScorecardResult) {
  const lines = [
    "Hi,",
    "",
    `Here is your full AI readiness report from ${site.name}.`,
    "",
    `YOUR SCORE: ${result.score}/100, ${result.band.name.toUpperCase()}`,
    "",
    result.band.summary,
    "",
    "BY AREA",
    ...result.areas.map(
      ({ area, score }) => `- ${areas[area].label}: ${score}/100`,
    ),
    "",
    `WHERE TO START: ${areas[result.weakest[0]].label.toUpperCase()}`,
    "",
    areas[result.weakest[0]].low,
    "",
  ];

  if (result.nextMoves.length > 0) {
    lines.push("YOUR NEXT MOVES, MOST URGENT FIRST", "");
    result.nextMoves.forEach(({ question }, index) => {
      lines.push(
        `${index + 1}. ${question.question}`,
        `   ${question.nextMove}`,
        "",
      );
    });
  }

  lines.push(
    "A 30-DAY PLAN",
    "",
    "Week 1: list the three most repetitive tasks in the business and time them.",
    "Week 2: write down how each one is done today, step by step.",
    `Week 3: fix the weakest area above (${areas[result.weakest[0]].label.toLowerCase()}) using the next moves listed.`,
    "Week 4: pick one task and try one AI tool on it, with clear rules on what information goes in.",
    "",
    `Your result page: ${absoluteUrl(resultPath(result.code))}`,
    `Free AI usage policy template: ${absoluteUrl("/resources/ai-usage-policy-template")}`,
    `POPIA and AI checklist: ${absoluteUrl("/resources/popia-ai-checklist")}`,
    "",
    `If you'd like a second pair of eyes, ${result.band.service.label} is the natural next step: ${absoluteUrl(result.band.service.href)}`,
    `Or book a free 30-minute call: ${site.calendarUrl}`,
    "",
    "Reply to this email with any questions. It comes straight to me.",
    "",
    site.founder.name,
    site.name,
  );
  return lines.join("\n");
}

export async function emailReport(
  _previous: ReportState,
  form: FormData,
): Promise<ReportState> {
  if (isNewsletterSpam(form)) return { status: "sent", newsletter: false };

  const raw = form.get("email");
  const typed = typeof raw === "string" ? raw : "";
  const email = parseEmail(form);
  if (!email) return { status: "invalid", email: typed, reason: "email" };
  if (form.get("consent") !== "on") {
    return { status: "invalid", email, reason: "consent" };
  }

  const code = form.get("code");
  const result = typeof code === "string" ? scoreResult(code) : null;
  if (!result) return { status: "failed", email };

  if (!mailerReady()) {
    console.error("Scorecard report not sent: Resend is not configured");
    return { status: "failed", email };
  }

  try {
    await sendEmail(
      {
        from: fromAddress(),
        to: email,
        replyTo: site.email,
        subject: `Your AI readiness score: ${result.score}/100`,
        text: reportText(result),
        tags: [{ name: "category", value: "scorecard_report" }],
      },
      // One report per address per result, even if the form is resubmitted.
      `scorecard:${email}:${result.code}`,
    );
  } catch (error) {
    console.error("Scorecard report email failed", error);
    return { status: "failed", email };
  }

  const newsletter = form.get("newsletter") === "on";
  if (newsletter) {
    await sendNewsletterConfirmation(email, "scorecard").catch((error) => {
      console.error("Scorecard newsletter confirmation failed", error);
    });
  }

  await track(events.scorecardEmail, {
    band: result.band.name,
    newsletter,
  }).catch(() => {});
  return { status: "sent", newsletter };
}
