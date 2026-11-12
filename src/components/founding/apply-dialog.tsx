"use client";

import {
  type ReactNode,
  useActionState,
  useEffect,
  useId,
  useRef,
} from "react";
import { type ApplyState, applyForFoundingSpot } from "@/app/actions/founding";
import { buttonClasses } from "@/components/ui/button-link";
import { events, track } from "@/lib/analytics";
import {
  type ApplicationField,
  HONEYPOT_FIELD,
  teamSizes,
} from "@/lib/founding-application";
import { site } from "@/lib/site";

const initialState: ApplyState = { status: "idle" };

const inputClasses =
  "mt-2 block w-full border border-ink/25 bg-cream px-4 py-3 text-base text-ink transition-colors hover:border-ink focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ember aria-invalid:border-rust";

/** The "Apply for a founding spot" button and the application dialog it opens. */
export function ApplyDialog({ waitlist }: { waitlist: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleId = useId();
  const [state, formAction, pending] = useActionState(
    applyForFoundingSpot,
    initialState,
  );

  const errors = state.status === "invalid" ? state.errors : {};
  const values =
    state.status === "invalid" || state.status === "failed" ? state.values : {};

  // Move focus to the first problem, or to the thank-you message.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
    } else if (state.status === "sent") {
      dialogRef.current?.querySelector<HTMLElement>("[data-sent]")?.focus();
    }
  }, [state]);

  const label = waitlist ? "Join the waitlist" : "Apply for a founding spot";

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={buttonClasses({
          variant: "dark",
          lift: true,
          className: "mt-6 cursor-pointer",
        })}
        aria-haspopup="dialog"
        {...track(
          events.foundingOpen,
          waitlist ? "waitlist" : "founding-offer",
        )}
      >
        {label}
        <span aria-hidden="true" className="glyph">
          →
        </span>
      </button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: closes on backdrop clicks; Escape already closes it from the keyboard. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-32px)] w-[min(600px,calc(100vw-32px))] overflow-y-auto border border-ink bg-paper p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-[clamp(24px,4vw,40px)]">
          <div className="flex items-start justify-between gap-6">
            <h2
              id={titleId}
              className="text-[clamp(1.6rem,3vw,2rem)]/[1.08] font-bold tracking-[-0.03em] text-balance"
            >
              {waitlist
                ? "Join the founding waitlist"
                : "Apply for a founding spot"}
            </h2>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close"
                className="-mt-1 -mr-2 grid size-11 shrink-0 cursor-pointer place-items-center text-2xl hover:text-rust"
              >
                <span aria-hidden="true">×</span>
              </button>
            </form>
          </div>

          {state.status === "sent" ? (
            <div data-sent="" tabIndex={-1} className="mt-5 outline-none">
              <p className="text-lg/[1.55] text-pretty">
                Thanks, {state.firstName}. Your application is in. I'll reply
                within two working days, and a copy is on its way to your inbox.
              </p>
              <form method="dialog">
                <button
                  type="submit"
                  className={buttonClasses({
                    className: "mt-7 cursor-pointer",
                  })}
                >
                  Close
                </button>
              </form>
            </div>
          ) : (
            <form ref={formRef} action={formAction} noValidate className="mt-3">
              <p className="text-base/[1.55] text-graphite text-pretty">
                {waitlist
                  ? "All five founding spots are taken. Leave your details and you'll be first in line if one opens up."
                  : "Two minutes, no prep. I read every application myself and reply within two working days."}
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Your name"
                  error={errors.name}
                  defaultValue={values.name}
                  autoComplete="name"
                />
                <Field
                  name="email"
                  label="Work email"
                  type="email"
                  error={errors.email}
                  defaultValue={values.email}
                  autoComplete="email"
                />
                <Field
                  name="company"
                  label="Company"
                  error={errors.company}
                  defaultValue={values.company}
                  autoComplete="organization"
                />
                <Field
                  name="website"
                  label="Website"
                  optional
                  type="url"
                  error={errors.website}
                  defaultValue={values.website}
                  autoComplete="url"
                  placeholder="example.co.za"
                />
                <Field
                  name="teamSize"
                  label="Team size"
                  error={errors.teamSize}
                  className="sm:col-span-2"
                >
                  {(props) => (
                    <select
                      {...props}
                      defaultValue={values.teamSize ?? ""}
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {teamSizes.map((size) => (
                        <option key={size} value={size}>
                          {size} people
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <Field
                  name="goal"
                  label="Where do you want AI to save time or money?"
                  error={errors.goal}
                  className="sm:col-span-2"
                >
                  {(props) => (
                    <textarea
                      {...props}
                      rows={4}
                      defaultValue={values.goal}
                      placeholder="For example: quotes take us two days to put together."
                      className={`${inputClasses} resize-y`}
                    />
                  )}
                </Field>
              </div>

              {/* Honeypot: hidden from people and assistive technology. */}
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label>
                  Leave this empty
                  <input
                    type="text"
                    name={HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <p
                role="alert"
                className="empty:hidden mt-5 font-medium text-rust"
              >
                {state.status === "failed" ? (
                  <>
                    Something went wrong sending that. Please try again, or
                    email <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </>
                ) : null}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <button
                  type="submit"
                  disabled={pending}
                  className={buttonClasses({
                    className:
                      "cursor-pointer disabled:cursor-wait disabled:opacity-70",
                  })}
                >
                  {pending ? "Sending…" : "Send application"}
                  <span aria-hidden="true" className="glyph">
                    →
                  </span>
                </button>
                <p className="max-w-[260px] text-[13px]/[1.45] text-graphite">
                  Used only to reply to you. See the{" "}
                  <a href="/privacy" className="underline hover:text-rust">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}

type ControlProps = {
  id: string;
  name: ApplicationField;
  required: boolean;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

function Field({
  name,
  label,
  error,
  optional = false,
  className = "",
  children,
  ...input
}: {
  name: ApplicationField;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children?: (props: ControlProps) => ReactNode;
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const props: ControlProps = {
    id,
    name,
    required: !optional,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
        {optional ? (
          <span className="font-normal text-graphite"> (optional)</span>
        ) : null}
      </label>
      {children ? (
        children(props)
      ) : (
        <input {...props} {...input} className={inputClasses} />
      )}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-rust">
          {error}
        </p>
      ) : null}
    </div>
  );
}
