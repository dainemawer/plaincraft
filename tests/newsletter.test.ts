/** Newsletter double opt-in tokens and form parsing. Runs without a server. */
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  createToken,
  isNewsletterSpam,
  NEWSLETTER_HONEYPOT,
  parseEmail,
  TOKEN_TTL_MS,
  verifyToken,
} from "../src/lib/newsletter.ts";

const secret = "test-secret";

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

describe("newsletter tokens", () => {
  test("a fresh token returns its email", () => {
    const token = createToken("thandi@example.co.za", secret);
    assert.equal(verifyToken(token, secret), "thandi@example.co.za");
  });

  test("an expired token is rejected", () => {
    const issued = Date.now() - TOKEN_TTL_MS - 1000;
    const token = createToken("thandi@example.co.za", secret, issued);
    assert.equal(verifyToken(token, secret), null);
  });

  test("a token signed with another secret is rejected", () => {
    const token = createToken("thandi@example.co.za", "other");
    assert.equal(verifyToken(token, secret), null);
  });

  test("a token with a swapped email is rejected", () => {
    const [, signature] = createToken("thandi@example.co.za", secret).split(
      ".",
    );
    const forged = `${Buffer.from(`someone@else.com|${Date.now() + 60_000}`).toString("base64url")}.${signature}`;
    assert.equal(verifyToken(forged, secret), null);
  });

  test("garbage is rejected", () => {
    for (const token of ["", "abc", "a.b", "...."]) {
      assert.equal(verifyToken(token, secret), null, token);
    }
  });
});

describe("newsletter form", () => {
  test("normalises a valid email", () => {
    assert.equal(
      parseEmail(form({ email: "  Thandi@Example.co.za " })),
      "thandi@example.co.za",
    );
  });

  test("rejects an invalid email", () => {
    assert.equal(parseEmail(form({ email: "not-an-email" })), null);
    assert.equal(parseEmail(form({})), null);
  });

  test("flags the honeypot", () => {
    assert.equal(isNewsletterSpam(form({ [NEWSLETTER_HONEYPOT]: "x" })), true);
    assert.equal(isNewsletterSpam(form({ email: "a@b.co" })), false);
  });
});
