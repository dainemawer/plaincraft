"use client";

import { buttonClasses } from "@/components/ui/button-link";

/** Opens the print dialog, where "Save as PDF" gives a PDF copy. */
export function PrintButton({
  label = "Print or save as PDF",
}: {
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`${buttonClasses({ variant: "outline-strong" })} cursor-pointer`}
    >
      {label}
    </button>
  );
}
