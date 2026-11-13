/**
 * Newsletter double opt-in. Signup sends a link carrying a signed token; only
 * opening it adds the address to the list. Tokens are stateless (email and
 * expiry, signed with HMAC-SHA256) and expire after a week.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { NEWSLETTER_HONEYPOT } from "./newsletter-fields.ts";

export { NEWSLETTER_HONEYPOT };
export const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseEmail(form: FormData) {
  const raw = form.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  return EMAIL_PATTERN.test(email) && email.length <= 254 ? email : null;
}

export function isNewsletterSpam(form: FormData) {
  const value = form.get(NEWSLETTER_HONEYPOT);
  return typeof value === "string" && value.trim() !== "";
}

const encode = (text: string) => Buffer.from(text).toString("base64url");
const decode = (text: string) => Buffer.from(text, "base64url").toString();
const sign = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

export function createToken(email: string, secret: string, now = Date.now()) {
  const payload = encode(`${email}|${now + TOKEN_TTL_MS}`);
  return `${payload}.${sign(payload, secret)}`;
}

/** The email the token was issued for, or null if it's forged or expired. */
export function verifyToken(token: string, secret: string, now = Date.now()) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given))
    return null;

  const [email, expires] = decode(payload).split("|");
  if (!email || !(Number(expires) > now)) return null;
  return email;
}

/**
 * The signing secret. NEWSLETTER_SECRET if set, otherwise derived from the
 * Resend key, which is already a server-only secret.
 */
export function newsletterSecret() {
  const base = process.env.NEWSLETTER_SECRET ?? process.env.RESEND_API_KEY;
  return base ? `plaincraft-newsletter:${base}` : null;
}
