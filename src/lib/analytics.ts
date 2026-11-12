/**
 * Custom Vercel Analytics events. Clicks are tracked by one listener in
 * src/instrumentation-client.ts that reads these data attributes, so links
 * stay server-rendered.
 */

export const events = {
  bookCall: "Book call",
  foundingOpen: "Founding apply open",
  foundingSubmitted: "Founding application",
  foundingFailed: "Founding application failed",
  email: "Email click",
  linkedIn: "LinkedIn click",
  explore: "Explore click",
} as const;

export type EventName = (typeof events)[keyof typeof events];

/** Data attributes that mark an element's clicks as an analytics event. */
export const track = (event: EventName, location: string) =>
  ({ "data-track": event, "data-track-location": location }) as const;
