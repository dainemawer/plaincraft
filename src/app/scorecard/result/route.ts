import { type NextRequest, NextResponse } from "next/server";
import {
  parseCode,
  resultPath,
  scorecardQuestions,
  toCode,
} from "@/content/scorecard";

/**
 * The scorecard form submits here with GET (so it works without
 * JavaScript). Turns the answers into a result code and redirects to the
 * shareable result page; incomplete answers go back to the form.
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const code = toCode(
    scorecardQuestions.map((question) =>
      Number(params.get(question.id) ?? NaN),
    ),
  );
  const target = parseCode(code) ? resultPath(code) : "/scorecard";
  return NextResponse.redirect(new URL(target, request.url), 303);
}
