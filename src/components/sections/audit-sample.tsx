import { type AuditVerdict, auditRows } from "@/content/home";
import { site } from "@/lib/site";

const verdicts: Record<AuditVerdict, { label: string; className: string }> = {
  automate: { label: "Automate", className: "px-[9px] py-[5px] bg-ember" },
  assist: { label: "Assist", className: "px-2 py-1 border border-ink" },
  "fix-first": { label: "Fix first", className: "px-[9px] py-[5px] bg-sand" },
  "not-for-ai": {
    label: "Not for AI",
    className: "px-2 py-1 border border-dashed border-graphite text-graphite",
  },
};

const row =
  "grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] items-center gap-3 px-[18px]";

/** Illustrative one-page audit summary. Animated by CSS once revealed. */
export function AuditSample() {
  return (
    <figure
      data-reveal=""
      data-reveal-delay={120}
      data-audit=""
      className="relative border border-ink bg-cream shadow-[10px_10px_0_var(--color-ink)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-ink px-[18px] py-3.5 text-xs">
        <span>Readiness audit · sample</span>
        <span className="text-graphite">Illustrative</span>
      </div>

      <div className="relative overflow-hidden">
        <div
          data-audit-scan=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,transparent,rgb(232_73_42/0.10),transparent)]"
        />
        <table className="block w-full text-left">
          <caption className="sr-only">
            Illustrative example of a {site.name} AI readiness audit summary
          </caption>
          <thead className="block">
            <tr
              className={`${row} border-b border-ink/12 py-2.5 text-[11px] text-graphite`}
            >
              <th scope="col" className="font-normal">
                Process
              </th>
              <th scope="col" className="font-normal">
                Hrs / week
              </th>
              <th scope="col" className="font-normal">
                Verdict
              </th>
            </tr>
          </thead>
          <tbody className="block">
            {auditRows.map((item, index) => {
              const verdict = verdicts[item.verdict];
              return (
                <tr
                  key={item.process}
                  style={{ "--row": index }}
                  className={`${row} border-b border-ink/12 py-3.5 last:border-b-0`}
                >
                  <th
                    scope="row"
                    className={`text-[15px] font-medium ${item.hours === null ? "text-graphite" : ""}`}
                  >
                    {item.process}
                  </th>
                  <td className="flex items-center gap-2 text-xs">
                    {item.hours === null ? (
                      <span className="text-graphite">n/a</span>
                    ) : (
                      <>
                        <span
                          data-audit-bar=""
                          aria-hidden="true"
                          style={{ width: `${item.bar}%` }}
                          className="block h-1.5 bg-ink"
                        />
                        {item.hours}
                      </>
                    )}
                  </td>
                  <td>
                    <span
                      data-audit-verdict=""
                      className={`inline-block text-[11px] font-medium ${verdict.className}`}
                    >
                      {verdict.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <figcaption className="border-t border-ink bg-sand px-[18px] py-3.5 text-[13px]/[1.5] text-graphite">
        Every recommendation is rated for value, effort and risk, including the
        ones I tell you to leave alone.
      </figcaption>
    </figure>
  );
}
