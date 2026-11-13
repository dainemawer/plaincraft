import { track } from "@vercel/analytics/server";
import { type NextRequest, NextResponse } from "next/server";
import { events } from "@/lib/analytics";
import { newsletterSecret, verifyToken } from "@/lib/newsletter";
import { addContactToSegment } from "@/lib/resend";

/** Opens from the confirmation email: adds the address to the newsletter. */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const secret = newsletterSecret();
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  const email = secret ? verifyToken(token, secret) : null;

  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), 303);

  if (!email) return redirect("/newsletter/link-expired");
  if (!segmentId) {
    console.error(
      "Newsletter confirm failed: RESEND_NEWSLETTER_SEGMENT_ID is not set",
    );
    return redirect("/newsletter/link-expired");
  }

  try {
    await addContactToSegment({ email }, segmentId);
  } catch (error) {
    console.error("Newsletter confirm failed", error);
    return redirect("/newsletter/link-expired");
  }

  await track(events.newsletterConfirmed).catch(() => {});
  return redirect("/newsletter/confirmed");
}
