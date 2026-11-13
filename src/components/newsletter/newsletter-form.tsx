"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { type SubscribeState, subscribe } from "@/app/actions/newsletter";
import { NEWSLETTER_HONEYPOT } from "@/lib/newsletter-fields";
import { site } from "@/lib/site";

const initialState: SubscribeState = { status: "idle" };

const tones = {
  light: {
    input:
      "border-ink/25 bg-cream text-ink hover:border-ink focus:border-ink placeholder:text-graphite/70",
    button: "bg-ink text-paper hover:bg-rust",
    muted: "text-graphite",
    link: "text-ink underline hover:text-rust",
  },
  dark: {
    input:
      "border-paper/25 bg-ink text-paper hover:border-paper focus:border-paper placeholder:text-stone",
    button: "bg-ember text-ink hover:bg-paper",
    muted: "text-stone",
    link: "text-paper underline",
  },
} as const;

/**
 * Email signup with double opt-in: the action emails a confirmation link,
 * and only that link adds the address to the list.
 */
export function NewsletterForm({
  source,
  tone = "light",
  className = "",
}: {
  /** Where the form sits, for analytics, e.g. "footer" or "article". */
  source: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(subscribe, initialState);
  const id = useId();
  const styles = tones[tone];

  if (state.status === "sent") {
    return (
      <output className={`block text-base/[1.55] ${className}`}>
        Check your inbox. I've sent a link to confirm your signup.
      </output>
    );
  }

  const invalid = state.status === "invalid";
  const email =
    state.status === "invalid" || state.status === "failed" ? state.email : "";

  return (
    <form action={formAction} noValidate className={className}>
      <input type="hidden" name="source" value={source} />
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input
          id={`${id}-hp`}
          name={NEWSLETTER_HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={email}
          placeholder="you@company.co.za"
          aria-invalid={invalid}
          aria-describedby={`${id}-note`}
          className={`min-h-11 min-w-0 flex-[1_1_200px] border px-4 py-2.5 text-base transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-ember aria-invalid:border-rust ${styles.input}`}
        />
        <button
          type="submit"
          disabled={pending}
          className={`min-h-11 cursor-pointer px-5 py-2.5 text-[15px] font-semibold transition-colors disabled:cursor-wait disabled:opacity-70 ${styles.button}`}
        >
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <p
        id={`${id}-note`}
        aria-live="polite"
        className={`mt-2.5 text-[13px]/[1.5] ${invalid || state.status === "failed" ? "text-rust" : styles.muted}`}
      >
        {invalid ? (
          "Enter an email address like name@company.co.za."
        ) : state.status === "failed" ? (
          `That didn't go through. Try again, or email ${site.email}.`
        ) : (
          <>
            About twice a month. Unsubscribe any time.{" "}
            <Link href="/privacy" className={styles.link}>
              Privacy
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
