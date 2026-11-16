"use server";

import { sendNewsletterConfirmation } from "@/lib/mailer";
import { isNewsletterSpam, parseEmail } from "@/lib/newsletter";

export type SubscribeState =
  | { status: "idle" }
  | { status: "invalid"; email: string }
  | { status: "failed"; email: string }
  | { status: "sent" };

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

  const source = form.get("source");
  try {
    await sendNewsletterConfirmation(
      email,
      typeof source === "string" ? source : "unknown",
    );
  } catch (error) {
    console.error("Newsletter confirmation email failed", error);
    return { status: "failed", email };
  }
  return { status: "sent" };
}
