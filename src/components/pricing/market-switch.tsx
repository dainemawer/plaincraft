import { type Market, markets } from "@/content/pricing";

/**
 * Radio switch between the South African and UK/EU price lists. Mark each
 * market's content with data-market="za" or data-market="uk"; globals.css
 * hides the one that isn't selected, with no JavaScript. Use once per page.
 */
export function MarketSwitch({ className = "" }: { className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="sr-only">Show prices for</legend>
      <div className="inline-flex border border-ink bg-paper">
        {(Object.keys(markets) as Market[]).map((market) => (
          <label key={market} className="cursor-pointer">
            <input
              type="radio"
              name="market"
              id={`market-${market}`}
              value={market}
              defaultChecked={market === "za"}
              className="peer sr-only"
            />
            <span className="block px-[clamp(14px,2vw,22px)] py-3 text-[15px] font-semibold peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rust">
              {markets[market].label}{" "}
              <span className="font-normal opacity-70">
                {markets[market].currency}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
