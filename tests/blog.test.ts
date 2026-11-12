/**
 * The blog: listing, articles, drafts and topic pages. Run against a
 * production build (drafts are only visible in `next dev`).
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const published = [
  "/blog/what-ai-can-do-for-a-small-business",
  "/blog/unused-chatgpt-licences",
  "/blog/popia-ai-tools-checklist",
  "/blog/automating-quotes",
  "/blog/ai-vendor-questions",
  "/blog/where-ai-shouldnt-go",
  "/blog/ai-usage-policy",
  "/blog/invoice-capture",
];
const drafts: string[] = [];

const page = async (path: string, headers: Record<string, string> = {}) => {
  const res = await fetch(new URL(path, BASE_URL), { headers });
  return { status: res.status, html: await res.text() };
};

const nodes = (html: string) =>
  [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
    .map((match) => JSON.parse(match[1]))
    .flatMap((data) => data["@graph"] ?? [data]);

describe("blog index", () => {
  test("is indexable and lists published articles", async () => {
    const { status, html } = await page("/blog");
    assert.equal(status, 200);
    assert.equal(html.match(/<h1[\s>]/g)?.length, 1, "exactly one h1");
    assert.match(html, /<link rel="canonical" href="[^"]+\/blog"/);
    for (const path of published)
      assert.match(html, new RegExp(`href="${path}"`));
    const types = nodes(html).map((node) => node["@type"]);
    assert.ok(types.includes("Blog"));
    assert.ok(types.includes("CollectionPage"));
  });

  test("is linked from the main navigation", async () => {
    assert.match((await page("/")).html, /href="\/blog"/);
  });
});

describe("articles", () => {
  for (const path of published) {
    test(`${path} is an indexable BlogPosting by the founder`, async () => {
      const { status, html } = await page(path);
      assert.equal(status, 200);
      assert.equal(html.match(/<h1[\s>]/g)?.length, 1, "exactly one h1");
      assert.match(
        html,
        new RegExp(`<link rel="canonical" href="[^"]+${path}"`),
      );
      assert.match(html, /<meta property="og:type" content="article"/);
      assert.doesNotMatch(html, /noindex/);

      const graph = nodes(html);
      const post = graph.find((node) => node["@type"] === "BlogPosting");
      assert.ok(post, "BlogPosting");
      assert.match(post.datePublished, /^\d{4}-\d{2}-\d{2}$/);
      const author = graph.find((node) => node["@id"] === post.author["@id"]);
      assert.equal(author?.["@type"], "Person");
      assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList"));
    });

    test(`${path} table of contents points at real headings`, async () => {
      const { html } = await page(path);
      const aside =
        html.match(/<aside aria-label="On this page"[\s\S]*?<\/aside>/)?.[0] ??
        "";
      const targets = [...aside.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
      assert.ok(targets.length >= 3, "has entries");
      for (const id of targets) {
        assert.match(html, new RegExp(`<h2 id="${id}"`), id);
      }
    });
  }

  test("are in the sitemap and llms.txt", async () => {
    const { html: xml } = await page("/sitemap.xml");
    const { html: llms } = await page("/llms.txt");
    for (const path of [...published, "/blog"]) {
      assert.match(xml, new RegExp(`<loc>[^<]+${path}</loc>`), path);
    }
    for (const path of published) assert.ok(llms.includes(path), path);
  });

  test("unknown article slugs 404", async () => {
    assert.equal((await page("/blog/not-an-article")).status, 404);
    const agent = await page("/blog/not-an-article", {
      accept: "text/markdown",
    });
    assert.equal(agent.status, 404);
  });
});

describe("drafts", () => {
  test("are not published anywhere", async () => {
    const { html: blog } = await page("/blog");
    const { html: xml } = await page("/sitemap.xml");
    const { html: llms } = await page("/llms.txt");
    for (const path of drafts) {
      assert.equal((await page(path)).status, 404, path);
      assert.ok(!blog.includes(`href="${path}"`), `${path} on /blog`);
      assert.ok(!xml.includes(path), `${path} in sitemap`);
      assert.ok(!llms.includes(path), `${path} in llms.txt`);
    }
  });
});

describe("topic pages", () => {
  test("stay out of the index until they list more than one article", async () => {
    const { status, html } = await page("/blog/category/buying");
    assert.equal(status, 200);
    assert.match(html, /<meta name="robots" content="noindex, follow"/);
    assert.ok(
      !(await page("/sitemap.xml")).html.includes("/blog/category/buying"),
    );
  });

  test("unknown topics 404", async () => {
    assert.equal((await page("/blog/category/not-a-topic")).status, 404);
  });
});
