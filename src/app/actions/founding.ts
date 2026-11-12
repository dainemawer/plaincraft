"use server";

import { track } from "@vercel/analytics/server";
import { updateTag } from "next/cache";
import { events } from "@/lib/analytics";
import { FOUNDING_SPOTS_TAG } from "@/lib/founding";
import {
  type Application,
  type FieldErrors,
  isSpam,
  parseApplication,
  splitName,
} from "@/lib/founding-application";
import { addContactToSegment, resendConfigured, sendEmail } from "@/lib/resend";
import { site } from "@/lib/site";

export type ApplyState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: Record<string, string> }
  | { status: "failed"; values: Record<string, string> }
  | { status: "sent"; firstName: string };

const from = () =>
  process.env.RESEND_FROM ?? `${site.founder.name} <${site.email}>`;

const notification = (a: Application) =>
  [
    `New founding-client application from ${a.name}.`,
    "",
    `Name: ${a.name}`,
    `Email: ${a.email}`,
    `Company: ${a.company}`,
    `Website: ${a.website || "—"}`,
    `Team size: ${a.teamSize}`,
    "",
    "What they want AI to help with:",
    a.goal,
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");

const confirmation = (a: Application, firstName: string) =>
  [
    `Hi ${firstName},`,
    "",
    `Thanks for applying for a founding spot with ${site.name}. I read every application myself and will reply within two working days, usually with a few times for a 30-minute call.`,
    "",
    "Here's what you sent:",
    "",
    `Company: ${a.company}`,
    `Team size: ${a.teamSize}`,
    `What you want AI to help with: ${a.goal}`,
    "",
    "If anything changes in the meantime, just reply to this email.",
    "",
    site.founder.name,
    site.name,
    site.url,
  ].join("\n");

export async function applyForFoundingSpot(
  _previous: ApplyState,
  form: FormData,
): Promise<ApplyState> {
  // Look successful to bots so they don't retry.
  if (isSpam(form)) return { status: "sent", firstName: "there" };

  const parsed = parseApplication(form);
  if (!parsed.ok)
    return { status: "invalid", errors: parsed.errors, values: parsed.values };

  const application = parsed.application;
  const { firstName, lastName } = splitName(application.name);

  if (!resendConfigured()) {
    console.error("Founding application not sent: RESEND_API_KEY is not set");
    return { status: "failed", values: { ...application } };
  }

  try {
    await sendEmail({
      from: from(),
      to: site.email,
      replyTo: application.email,
      subject: `Founding application: ${application.company}`,
      text: notification(application),
      tags: [{ name: "category", value: "founding_application" }],
    });
  } catch (error) {
    console.error("Founding application email failed", error);
    await track(events.foundingFailed).catch(() => {});
    return { status: "failed", values: { ...application } };
  }

  // The application has reached the inbox; the rest is best effort.
  const segmentId = process.env.RESEND_FOUNDING_SEGMENT_ID;
  const results = await Promise.allSettled([
    sendEmail({
      from: from(),
      to: application.email,
      replyTo: site.email,
      subject: `Your ${site.name} founding-client application`,
      text: confirmation(application, firstName),
      tags: [{ name: "category", value: "founding_confirmation" }],
    }),
    segmentId
      ? addContactToSegment(
          { email: application.email, firstName, lastName },
          segmentId,
        )
      : Promise.reject(new Error("RESEND_FOUNDING_SEGMENT_ID is not set")),
    track(events.foundingSubmitted, { teamSize: application.teamSize }),
  ]);
  for (const result of results) {
    if (result.status === "rejected")
      console.error("Founding application follow-up failed", result.reason);
  }

  updateTag(FOUNDING_SPOTS_TAG);
  return { status: "sent", firstName };
}
