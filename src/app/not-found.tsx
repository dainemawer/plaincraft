import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="shell section-y">
      <p className="text-[15px] font-semibold text-rust">404</p>
      <h1
        id="not-found-title"
        className="mt-4 max-w-[760px] text-heading font-bold text-balance"
      >
        That page doesn't exist.
      </h1>
      <p className="mt-6 max-w-[480px] text-lg/[1.55] text-graphite">
        It may have moved, or the link may be wrong.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to the homepage
      </ButtonLink>
    </section>
  );
}
