import { site } from "./site";

/** The brand name split around the "ai" that the wordmark highlights. */
export function wordmarkParts(name: string = site.name) {
  const index = name.toLowerCase().indexOf("ai");
  if (index === -1) return { before: name, accent: "", after: "" };
  return {
    before: name.slice(0, index),
    accent: name.slice(index, index + 2),
    after: name.slice(index + 2),
  };
}
