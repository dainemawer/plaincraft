"use server";

import { track } from "@vercel/analytics/server";
import { events } from "@/lib/analytics";
import {
  createToken,
  isNewsletterSpam,
  newsletterSecret,
  parseEmail,
} from "@/lib/newsletter";
import { resendConfigured, sendEmail } from "@/lib/resend";
import { absoluteUrl, site } from "@/lib/site";

export type SubscribeState =
  | { status: "idle" }
  | { status: "invalid"; email: string }
  | { status: "failed"; email: string }
  | { status: "sent" };

const from = () =>
  process.env.RESEND_FROM ?? `${site.founder.name} <${site.email}>`;

const confirmation = (link: string) =>
  [
    "Hi,",
    "",
    `Please confirm you'd like the ${site.name} newsletter: practical notes on where AI helps a small business, where it doesn't, and how to start. About twice a month.`,
    "",
    `Confirm here: ${link}`,
    "",
    "The link works for seven days. If you didn't sign up, ignore this email and you won't hear from me again.",
    "",
    site.founder.name,
    site.name,
  ].join("\n");

export async function subscribe(
  _previous: SubscribeState,
  form: FormData,
): Promise<SubscribeState> {
  // Look successful to bots so they don't retry.
  if (isNewsletterSpam(form)) return { status: "sent" };

  const email = parseEmail(form);
  if (!email) {
    const raw = form.get("email");
    return { status: "invalid", email: typeof raw === "string" ? raw : "" };
  }

  const secret = newsletterSecret();
  if (!resendConfigured() || !secret) {
    console.error("Newsletter signup not sent: Resend is not configured");
    return { status: "failed", email };
  }

  const link = absoluteUrl(
    `/newsletter/confirm?token=${createToken(email, secret)}`,
  );

  try {
    await sendEmail({
      from: from(),
      to: email,
      replyTo: site.email,
      subject: `Confirm your ${site.name} newsletter signup`,
      text: confirmation(link),
      tags: [{ name: "category", value: "newsletter_confirm" }],
    });
  } catch (error) {
    console.error("Newsletter confirmation email failed", error);
    return { status: "failed", email };
  }

  const source = form.get("source");
  await track(events.newsletterSignup, {
    source: typeof source === "string" ? source : "unknown",
  }).catch(() => {});
  return { status: "sent" };
}
