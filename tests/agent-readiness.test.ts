/**
 * End-to-end checks for how the site presents itself to AI agents.
 * Run against a production build: `pnpm build && pnpm start`, then
 * `pnpm test` (or set BASE_URL to test a deployment).
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const markdown = { accept: "text/markdown" };

const get = (path: string, headers: Record<string, string> = {}) =>
  fetch(new URL(path, BASE_URL), { headers, redirect: "manual" });

const textContent = (html: string) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const jsonLd = (html: string) =>
  [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
    .map((match) => JSON.parse(match[1]))
    .flatMap((data) => data["@graph"] ?? [data]);

describe("homepage", () => {
  test("serves HTML with agent metadata", async () => {
    const res = await get("/");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /text\/html/);
    const html = await res.text();
    assert.match(html, /<meta name="is-agentic-site-type" content="business"/);
    assert.match(
      html,
      /<link rel="alternate" type="text\/markdown" href="[^"]+\/index\.md"/,
    );
  });

  test("serves Markdown when asked for it", async () => {
    const res = await get("/", markdown);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /text\/markdown/);
    assert.match(res.headers.get("vary") ?? "", /Accept/i);
    assert.match(await res.text(), /^# Plaincraft/);
  });

  test("still serves HTML to browsers that also accept Markdown", async () => {
    const res = await get("/", { accept: "text/html,text/markdown;q=0.9" });
    assert.match(res.headers.get("content-type") ?? "", /text\/html/);
  });

  test("describes the organisation with contact point and address", async () => {
    const org = jsonLd(await (await get("/")).text()).find(
      (node) => node["@type"] === "ProfessionalService",
    );
    assert.ok(org, "ProfessionalService node present");
    assert.equal(org.contactPoint["@type"], "ContactPoint");
    assert.ok(org.contactPoint.email);
    assert.ok(org.contactPoint.contactType);
    assert.equal(org.address["@type"], "PostalAddress");
    assert.ok(org.keywords);
  });
});

describe("404s", () => {
  test("return an HTML 404 to browsers", async () => {
    const res = await get("/this-page-does-not-exist");
    assert.equal(res.status, 404);
    assert.match(res.headers.get("content-type") ?? "", /text\/html/);
  });

  test("return a helpful Markdown 404 to agents", async () => {
    const res = await get("/this-page-does-not-exist", markdown);
    assert.equal(res.status, 404);
    assert.match(res.headers.get("content-type") ?? "", /text\/markdown/);
    const body = await res.text();
    assert.ok(body.length >= 20);
    assert.match(body, /\/llms\.txt\)/);
    assert.match(body, /\/sitemap\.xml\)/);
  });

  test("leave real pages and generated routes alone", async () => {
    for (const path of ["/privacy", "/about", "/apple-icon"]) {
      const res = await get(path, markdown);
      assert.equal(res.status, 200, path);
    }
  });
});

describe("trust pages", () => {
  for (const path of ["/about", "/contact", "/privacy"]) {
    test(`${path} has at least 500 characters of content`, async () => {
      const res = await get(path);
      assert.equal(res.status, 200);
      const main = (await res.text()).match(/<main[\s\S]*<\/main>/)?.[0] ?? "";
      assert.ok(textContent(main).length >= 500, `${path} is too short`);
    });
  }

  test("are listed in the sitemap", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    for (const path of ["/about", "/contact", "/privacy", "/terms"]) {
      assert.match(xml, new RegExp(`<loc>[^<]+${path}</loc>`));
    }
  });
});

describe("machine-readable files", () => {
  test("llms.txt tells agents when and how to use Plaincraft", async () => {
    const res = await get("/llms.txt");
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.match(body, /^# Plaincraft/);
    assert.match(body, /^## When to use Plaincraft$/m);
    assert.match(body, /^## How to engage$/m);
  });

  test("index.md is Markdown", async () => {
    const res = await get("/index.md");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /text\/markdown/);
  });

  test("robots.txt points to the sitemap", async () => {
    assert.match(await (await get("/robots.txt")).text(), /^Sitemap: /m);
  });
});
