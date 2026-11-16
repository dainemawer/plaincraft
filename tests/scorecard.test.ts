import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  parseCode,
  QUESTION_COUNT,
  scorecardQuestions,
  scoreResult,
} from "../src/content/scorecard.ts";

describe("scorecard", () => {
  test("has ten questions across all four areas", () => {
    assert.equal(QUESTION_COUNT, 10);
    const found = new Set(scorecardQuestions.map((question) => question.area));
    assert.deepEqual([...found].sort(), [
      "data",
      "governance",
      "people",
      "processes",
    ]);
  });

  test("rejects codes of the wrong length or with out-of-range digits", () => {
    assert.equal(parseCode("123"), null);
    assert.equal(parseCode("0123012304"), null);
    assert.equal(parseCode("012301230a"), null);
    assert.deepEqual(parseCode("0123012301"), [0, 1, 2, 3, 0, 1, 2, 3, 0, 1]);
  });

  test("scores the extremes 0 and 100", () => {
    assert.equal(scoreResult("0000000000")?.score, 0);
    assert.equal(scoreResult("3333333333")?.score, 100);
    assert.equal(scoreResult("3333333333")?.nextMoves.length, 0);
  });

  test("puts each score in the right band", () => {
    assert.equal(scoreResult("0000000000")?.band.name, "Foundations first");
    assert.equal(
      scoreResult("2222222222")?.band.name,
      "Ready for targeted wins",
    );
    assert.equal(scoreResult("3333333322")?.band.name, "Ready to scale");
    assert.equal(scoreResult("1111111111")?.band.name, "Foundations first");
    assert.equal(
      scoreResult("2130212301")?.band.name,
      "Ready for targeted wins",
    );
  });

  test("names the weakest area first and orders next moves weakest first", () => {
    // Governance answers (last two) are 0; everything else is 3.
    const result = scoreResult("3333333300");
    assert.equal(result?.weakest[0], "governance");
    assert.deepEqual(
      result?.nextMoves.map((move) => move.question.area),
      ["governance", "governance"],
    );
  });
});
