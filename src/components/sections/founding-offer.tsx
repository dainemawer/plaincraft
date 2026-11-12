import { ApplyDialog } from "@/components/founding/apply-dialog";
import { getFoundingSpots } from "@/lib/founding";

export async function FoundingOffer() {
  const { total, taken, left } = await getFoundingSpots();
  const full = left === 0;

  return (
    <section
      aria-labelledby="founding-title"
      className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,9vw,128px)]"
    >
      <div
        data-reveal=""
        className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-16 gap-y-8 bg-ember p-[clamp(32px,5vw,64px)] text-ink"
      >
        <div>
          <h2
            id="founding-title"
            className="text-heading-sm font-bold text-balance"
          >
            I'm taking on five founding clients for 2027.
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <span aria-hidden="true" className="flex gap-1.5">
              {Array.from({ length: total }, (_, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length, static list
                  key={i}
                  className={`size-3.5 border-2 border-ink ${i < taken ? "bg-ink" : ""}`}
                />
              ))}
            </span>
            <p className="text-base font-semibold">
              {full
                ? `All ${total} spots filled`
                : taken === 0
                  ? `All ${total} spots open`
                  : `${taken} of ${total} spots filled · ${left} left`}
            </p>
          </div>
        </div>
        <div>
          <p className="text-lg/[1.55] text-pretty">
            You get my full attention and founding-client terms. In return, once
            we've delivered results you're happy with, I'll ask to write the
            work up as a case study. Only with your sign-off.
          </p>
          <ApplyDialog waitlist={full} />
        </div>
      </div>
    </section>
  );
}
