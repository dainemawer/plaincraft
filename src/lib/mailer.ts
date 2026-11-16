/**
 * Email the site sends, shared by the server actions. Server-only.
 */
import { track } from "@vercel/analytics/server";
import { events } from "@/lib/analytics";
import { createToken, newsletterSecret } from "@/lib/newsletter";
import { resendConfigured, sendEmail } from "@/lib/resend";
import { absoluteUrl, site } from "@/lib/site";

export const fromAddress = () =>
  process.env.RESEND_FROM ?? `${site.founder.name} <${site.email}>`;

/** True when Resend and the newsletter signing secret are both set. */
export const mailerReady = () =>
  resendConfigured() && Boolean(newsletterSecret());

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

/**
 * Double opt-in: emails a signed confirmation link. Only opening the link
 * adds the address to the list. Throws if the email can't be sent.
 */
export async function sendNewsletterConfirmation(
  email: string,
  source: string,
) {
  const secret = newsletterSecret();
  if (!resendConfigured() || !secret) {
    throw new Error("Resend is not configured");
  }
  const link = absoluteUrl(
    `/newsletter/confirm?token=${createToken(email, secret)}`,
  );
  await sendEmail({
    from: fromAddress(),
    to: email,
    replyTo: site.email,
    subject: `Confirm your ${site.name} newsletter signup`,
    text: confirmation(link),
    tags: [{ name: "category", value: "newsletter_confirm" }],
  });
  await track(events.newsletterSignup, { source }).catch(() => {});
}
