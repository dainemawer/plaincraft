"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { events } from "@/lib/analytics";

/**
 * Records scorecard progress: one "start" on the first answer, then one
 * "step" per question answered. Also keeps the visible progress count in
 * step. The form works the same without it.
 */
export function StepTracker({
  formId,
  total,
}: {
  formId: string;
  total: number;
}) {
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) return;
    const answered = new Set<string>();
    const progress = document.getElementById(`${formId}-progress`);

    const onChange = (event: Event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== "radio")
        return;
      if (answered.size === 0) track(events.scorecardStart);
      if (!answered.has(input.name)) {
        answered.add(input.name);
        track(events.scorecardStep, {
          step: answered.size,
          question: input.name,
        });
      }
      if (progress)
        progress.textContent = `${answered.size} of ${total} answered`;
    };

    form.addEventListener("change", onChange);
    return () => form.removeEventListener("change", onChange);
  }, [formId, total]);

  return null;
}

/** Records that a result page was viewed, with its band. */
export function ResultTracker({
  band,
  score,
}: {
  band: string;
  score: number;
}) {
  useEffect(() => {
    track(events.scorecardResult, { band, score });
  }, [band, score]);
  return null;
}
