import Link from "next/link";
import type { Crumb } from "@/lib/structured-data";

/** Visible breadcrumb trail. Pair with the BreadcrumbList in the page's JSON-LD. */
export function Breadcrumb({
  trail,
  className = "mb-6",
}: {
  trail: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-graphite ${className}`}
    >
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {trail.map((item, index) => {
          const current = index === trail.length - 1;
          return (
            <li key={item.path} className="flex gap-2">
              {current ? (
                <span aria-current="page" className="text-rust">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="text-graphite hover:text-rust"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
