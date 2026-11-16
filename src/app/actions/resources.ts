"use server";

import { track } from "@vercel/analytics/server";
import {
  checklistText,
  policyText,
  type ResourceId,
  resources,
} from "@/content/resources";
import { events } from "@/lib/analytics";
import type { EmailCopyState } from "@/lib/email-copy";
import {
  fromAddress,
  mailerReady,
  sendNewsletterConfirmation,
} from "@/lib/mailer";
import { isNewsletterSpam, parseEmail } from "@/lib/newsletter";
import { sendEmail } from "@/lib/resend";
import { absoluteUrl, site } from "@/lib/site";

const bodies: Record<ResourceId, () => string> = {
  "popia-ai-checklist": checklistText,
  "ai-usage-policy-template": policyText,
};

const isResourceId = (value: unknown): value is ResourceId =>
  typeof value === "string" && value in resources;

/** Emails a copy of a free resource: the text, plus links to the page and download. */
export async function emailResource(
  _previous: EmailCopyState,
  form: FormData,
): Promise<EmailCopyState> {
  if (isNewsletterSpam(form)) return { status: "sent", newsletter: false };

  const raw = form.get("email");
  const email = parseEmail(form);
  if (!email) {
    return {
      status: "invalid",
      email: typeof raw === "string" ? raw : "",
      reason: "email",
    };
  }
  if (form.get("consent") !== "on") {
    return { status: "invalid", email, reason: "consent" };
  }

  const id = form.get("resource");
  if (!isResourceId(id)) return { status: "failed", email };
  const resource = resources[id];

  if (!mailerReady()) {
    console.error("Resource email not sent: Resend is not configured");
    return { status: "failed", email };
  }

  const text = [
    "Hi,",
    "",
    `Here's your copy of the ${resource.title}.`,
    "",
    `Read it online: ${absoluteUrl(resource.path)}`,
    `Download it for Word or Google Docs: ${absoluteUrl(`${resource.path}/download`)}`,
    "",
    "-----",
    "",
    bodies[id](),
    "",
    "-----",
    "",
    `Want help putting it into practice? Book a free 30-minute call: ${site.calendarUrl}`,
    "",
    "Reply to this email with any questions. It comes straight to me.",
    "",
    site.founder.name,
    site.name,
  ].join("\n");

  try {
    await sendEmail(
      {
        from: fromAddress(),
        to: email,
        replyTo: site.email,
        subject: `Your copy: ${resource.title}`,
        text,
        tags: [
          { name: "category", value: `resource_${id.replaceAll("-", "_")}` },
        ],
      },
      `resource:${email}:${id}`,
    );
  } catch (error) {
    console.error("Resource email failed", error);
    return { status: "failed", email };
  }

  const newsletter = form.get("newsletter") === "on";
  if (newsletter) {
    await sendNewsletterConfirmation(email, `resource:${id}`).catch((error) => {
      console.error("Resource newsletter confirmation failed", error);
    });
  }
  await track(events.resourceEmail, { resource: id, newsletter }).catch(
    () => {},
  );
  return { status: "sent", newsletter };
}
