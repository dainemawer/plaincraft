import { commitments, comparison } from "@/content/home";
import { site } from "@/lib/site";

export function Trust() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="bg-ink text-paper"
    >
      <div className="shell section-y">
        <div
          data-reveal=""
          className="mb-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-18 gap-y-6"
        >
          <h2 id="trust-title" className="text-heading font-bold text-balance">
            {site.name} is new. Here's how I earn your trust anyway.
          </h2>
          <p className="max-w-[480px] text-lg/[1.55] text-mist">
            No client logo wall yet, and I won't fake one. What I can give you
            is a way of working that puts the risk on me rather than on you.
          </p>
        </div>

        <table
          data-reveal=""
          className="mb-[clamp(56px,7vw,96px)] w-full table-fixed border-collapse border-t border-paper/25 text-left"
        >
          <caption className="sr-only">
            {site.name} compared with a typical consultancy
          </caption>
          <colgroup>
            <col className="w-[31%]" />
            <col className="w-[34.5%]" />
            <col className="w-[34.5%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-paper/25 text-xs">
              <th scope="col" className="py-4 pr-4 font-normal">
                <span className="sr-only">Topic</span>
              </th>
              <th scope="col" className="py-4 pr-4 font-normal text-stone">
                Typical consultancy
              </th>
              <th scope="col" className="py-4 font-normal text-ember">
                {site.name}
              </th>
            </tr>
          </thead>
          <tbody className="text-[clamp(15px,1.4vw,18px)] leading-[1.4]">
            {comparison.map((row) => (
              <tr key={row.topic} className="border-b border-paper/15">
                <th scope="row" className="py-5 pr-4 align-top font-semibold">
                  {row.topic}
                </th>
                <td className="py-5 pr-4 align-top text-stone">
                  {row.typical}
                </td>
                <td className="py-5 align-top">{row.us}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3
          data-reveal=""
          className="mb-7 text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.03em]"
        >
          My commitments to every client
        </h3>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-t border-l border-paper/20">
          {commitments.map((commitment, index) => (
            <li
              key={commitment.code}
              data-reveal=""
              data-reveal-delay={index * 80}
              className="flex flex-col gap-2.5 border-r border-b border-paper/20 bg-ink p-7 transition-colors duration-300 hover:bg-coal"
            >
              <span className="text-[13px] text-ember">{commitment.code}</span>
              <h4 className="text-xl font-bold tracking-[-0.02em]">
                {commitment.title}
              </h4>
              <p className="text-base/[1.55] text-mist">{commitment.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
