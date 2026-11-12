import { cacheLife, cacheTag } from "next/cache";
import { countSegmentContacts, resendConfigured } from "./resend";
import { site } from "./site";

export const FOUNDING_SPOTS_TAG = "founding-spots";

export type FoundingSpots = { total: number; taken: number; left: number };

/**
 * Founding spots taken, counted as unique applicants in the Resend segment.
 * Remove a contact from the segment in Resend to free its spot again.
 */
export async function getFoundingSpots(): Promise<FoundingSpots> {
  "use cache";
  cacheTag(FOUNDING_SPOTS_TAG);
  cacheLife("hours");

  const total = site.foundingSpots;
  const segmentId = process.env.RESEND_FOUNDING_SEGMENT_ID;
  let taken = 0;

  if (resendConfigured() && segmentId) {
    try {
      taken = await countSegmentContacts(segmentId, total);
    } catch (error) {
      console.error("Couldn't count founding applicants", error);
    }
  }

  return { total, taken, left: total - taken };
}
