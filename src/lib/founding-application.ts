/**
 * The founding-client application: its fields and validation. Pure, so the
 * server action, the form and the tests share one definition.
 */

export const teamSizes = ["1–10", "11–25", "26–50", "51–200", "200+"] as const;

export type Application = {
  name: string;
  email: string;
  company: string;
  website: string;
  teamSize: (typeof teamSizes)[number];
  goal: string;
};

export type ApplicationField = keyof Application;
export type FieldErrors = Partial<Record<ApplicationField, string>>;

/** Hidden field that people never see; bots fill it in. */
export const HONEYPOT_FIELD = "nickname";

const limits: Record<ApplicationField, number> = {
  name: 120,
  email: 254,
  company: 160,
  website: 200,
  teamSize: 10,
  goal: 2000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const read = (form: FormData, field: string) => {
  const value = form.get(field);
  return typeof value === "string" ? value.trim() : "";
};

export function isSpam(form: FormData) {
  return read(form, HONEYPOT_FIELD) !== "";
}

export function parseApplication(
  form: FormData,
):
  | { ok: true; application: Application }
  | { ok: false; errors: FieldErrors; values: Record<string, string> } {
  const values = Object.fromEntries(
    (Object.keys(limits) as ApplicationField[]).map((field) => [
      field,
      read(form, field),
    ]),
  ) as Record<ApplicationField, string>;

  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Tell me your name.";
  if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter an email address I can reply to.";
  if (!values.company) errors.company = "Which business is this for?";
  if (!teamSizes.includes(values.teamSize as Application["teamSize"]))
    errors.teamSize = "Pick the closest team size.";
  if (values.goal.length < 10)
    errors.goal = "A sentence or two is plenty, but I need something to go on.";

  for (const [field, max] of Object.entries(limits) as [
    ApplicationField,
    number,
  ][]) {
    if (values[field].length > max && !errors[field])
      errors[field] = `Keep this under ${max} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors, values };
  return { ok: true, application: values as Application };
}

/** Splits "Thandi van der Merwe" into "Thandi" and "van der Merwe". */
export function splitName(name: string) {
  const [first, ...rest] = name.split(/\s+/);
  return { firstName: first, lastName: rest.join(" ") || undefined };
}
