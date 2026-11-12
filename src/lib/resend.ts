/**
 * A small Resend REST client. Server-only: it reads RESEND_API_KEY.
 * See https://resend.com/docs/api-reference
 */

const API_URL = "https://api.resend.com";

export const resendConfigured = () => Boolean(process.env.RESEND_API_KEY);

class ResendError extends Error {
  constructor(
    readonly status: number,
    body: string,
  ) {
    super(`Resend responded ${status}: ${body}`);
  }
}

async function request<T>(
  path: string,
  init: { method?: string; body?: unknown; idempotencyKey?: string } = {},
): Promise<T> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const response = await fetch(`${API_URL}${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init.idempotencyKey
        ? { "Idempotency-Key": init.idempotencyKey }
        : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });

  if (!response.ok)
    throw new ResendError(response.status, await response.text());
  return (await response.json()) as T;
}

type Email = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
};

export function sendEmail(email: Email, idempotencyKey?: string) {
  return request<{ id: string }>("/emails", {
    method: "POST",
    idempotencyKey,
    body: {
      from: email.from,
      to: email.to,
      subject: email.subject,
      text: email.text,
      reply_to: email.replyTo,
      tags: email.tags,
    },
  });
}

/**
 * Adds a contact to a segment, creating the contact when it doesn't exist.
 * Contacts are unique by email, so a repeat applicant is counted once.
 */
export async function addContactToSegment(
  contact: { email: string; firstName?: string; lastName?: string },
  segmentId: string,
) {
  try {
    await request("/contacts", {
      method: "POST",
      body: {
        email: contact.email,
        first_name: contact.firstName,
        last_name: contact.lastName,
        segments: [{ id: segmentId }],
      },
    });
  } catch (error) {
    // Already a contact: add the existing one to the segment instead.
    if (!(error instanceof ResendError) || error.status >= 500) throw error;
    await request(
      `/contacts/${encodeURIComponent(contact.email)}/segments/${segmentId}`,
      { method: "POST" },
    );
  }
}

type ContactPage = { has_more: boolean; data: { id: string }[] };

/** Counts the contacts in a segment, stopping once `cap` is reached. */
export async function countSegmentContacts(segmentId: string, cap: number) {
  let count = 0;
  let after: string | undefined;

  while (count < cap) {
    const params = new URLSearchParams({ segment_id: segmentId, limit: "100" });
    if (after) params.set("after", after);
    const page = await request<ContactPage>(`/contacts?${params}`);
    count += page.data.length;
    after = page.data.at(-1)?.id;
    if (!page.has_more || !after) break;
  }

  return Math.min(count, cap);
}
