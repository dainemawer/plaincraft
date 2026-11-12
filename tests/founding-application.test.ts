/** Founding-client application validation. Runs without a server. */
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  HONEYPOT_FIELD,
  isSpam,
  parseApplication,
  splitName,
} from "../src/lib/founding-application.ts";

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

const valid = {
  name: "  Thandi van der Merwe ",
  email: "thandi@example.co.za",
  company: "Karoo Logistics",
  website: "",
  teamSize: "11–25",
  goal: "Quotes take us two days to put together.",
};

describe("founding application", () => {
  test("accepts a complete application and trims it", () => {
    const result = parseApplication(form(valid));
    assert.ok(result.ok);
    assert.equal(result.application.name, "Thandi van der Merwe");
  });

  test("reports each missing or invalid field", () => {
    const result = parseApplication(
      form({ ...valid, email: "nope", teamSize: "9000", goal: "" }),
    );
    assert.ok(!result.ok);
    assert.deepEqual(Object.keys(result.errors).sort(), [
      "email",
      "goal",
      "teamSize",
    ]);
    assert.equal(result.values.company, "Karoo Logistics");
  });

  test("rejects overly long input", () => {
    const result = parseApplication(form({ ...valid, goal: "a".repeat(2001) }));
    assert.ok(!result.ok);
    assert.ok(result.errors.goal);
  });

  test("flags the honeypot", () => {
    assert.equal(isSpam(form(valid)), false);
    assert.equal(isSpam(form({ ...valid, [HONEYPOT_FIELD]: "bot" })), true);
  });

  test("splits names on the first space", () => {
    assert.deepEqual(splitName("Thandi van der Merwe"), {
      firstName: "Thandi",
      lastName: "van der Merwe",
    });
    assert.deepEqual(splitName("Cher"), {
      firstName: "Cher",
      lastName: undefined,
    });
  });
});
