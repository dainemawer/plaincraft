"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { emailReport, type ReportState } from "@/app/actions/scorecard";
import { NEWSLETTER_HONEYPOT } from "@/lib/newsletter-fields";
import { site } from "@/lib/site";

const initialState: ReportState = { status: "idle" };

/** Emails the full scorecard report, with an optional newsletter opt-in. */
export function EmailReportForm({ code }: { code: string }) {
  const [state, formAction, pending] = useActionState(
    emailReport,
    initialState,
  );
  const id = useId();

  if (state.status === "sent") {
    return (
      <output className="block text-[17px]/[1.6]">
        Sent. Check your inbox for the full report
        {state.newsletter
          ? ", plus a separate link to confirm the newsletter."
          : "."}
      </output>
    );
  }

  const email =
    state.status === "invalid" || state.status === "failed" ? state.email : "";
  const badEmail = state.status === "invalid" && state.reason === "email";
  const noConsent = state.status === "invalid" && state.reason === "consent";

  return (
    <form action={formAction} noValidate>
      <input type="hidden" name="code" value={code} />
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input
          id={`${id}-hp`}
          name={NEWSLETTER_HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label htmlFor={`${id}-email`} className="block text-sm font-semibold">
        Email address
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={email}
          placeholder="you@company.co.za"
          aria-invalid={badEmail}
          aria-describedby={`${id}-note`}
          className="min-h-11 min-w-0 flex-[1_1_220px] border border-ink/25 bg-cream px-4 py-2.5 text-base text-ink transition-colors placeholder:text-graphite/70 hover:border-ink focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ember aria-invalid:border-rust"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 cursor-pointer bg-ink px-5 py-2.5 text-[15px] font-semibold text-paper transition-colors hover:bg-rust disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Email my report"}
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-3 text-[15px]/[1.5] text-graphite">
        <label className="flex gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={noConsent}
            className="mt-1 size-4 shrink-0 accent-ink"
          />
          <span>
            Email me this report. {site.name} uses my address only to send it.
          </span>
        </label>
        <label className="flex gap-3">
          <input
            type="checkbox"
            name="newsletter"
            className="mt-1 size-4 shrink-0 accent-ink"
          />
          <span>
            Also send me the newsletter (optional, about twice a month,
            unsubscribe any time).
          </span>
        </label>
      </div>
      <p
        id={`${id}-note`}
        aria-live="polite"
        className={`mt-3 text-[13px]/[1.5] ${state.status === "idle" ? "text-graphite" : "text-rust"}`}
      >
        {badEmail ? (
          "Enter an email address like name@company.co.za."
        ) : noConsent ? (
          "Tick the first box so I can send the report."
        ) : state.status === "failed" ? (
          `That didn't go through. Try again, or email ${site.email}.`
        ) : (
          <>
            Handled under the{" "}
            <Link
              href="/privacy"
              className="text-ink underline hover:text-rust"
            >
              privacy &amp; POPIA notice
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
