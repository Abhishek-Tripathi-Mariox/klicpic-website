import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Numbered pages for the catalogues the backend slices.
 *
 * Long runs collapse to first · … · neighbours · … · last. On a phone even
 * that is nine 40px targets — wider than the screen — so below `sm` the
 * neighbours drop out too and only first · … · current · … · last remain.
 */
const windowed = (page, pages, spread, max) => {
  if (pages <= max) return Array.from({ length: pages }, (_, i) => i + 1);

  const near = [];
  for (let n = page - spread; n <= page + spread; n += 1) {
    if (n > 1 && n < pages) near.push(n);
  }
  const list = [1, ...near, pages];

  const out = [];
  list.forEach((n, i) => {
    if (i && n - list[i - 1] > 1) out.push(`gap-${n}`);
    out.push(n);
  });
  return out;
};

export default function Pagination({ page, pages, total, noun = "items", onChange }) {
  if (!pages || pages <= 1) return null;

  const go = (next) => {
    if (next < 1 || next > pages || next === page) return;
    onChange(next);
  };

  const step =
    "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-[0.701px] border-solid transition-colors";

  return (
    <div className="flex w-full flex-col items-center pt-10">
      <p className="text-[13px] leading-[20px] text-[#99a1af]">
        Page {page} of {pages} · {total} {noun}
      </p>

      <div className="flex items-center justify-center gap-1 pt-3 sm:gap-2">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={`${step} ${
            page <= 1
              ? "cursor-not-allowed border-[#f3f4f6] text-[#d1d5dc]"
              : "border-[#e5e7eb] text-[#1f2937] hover:border-[#f9a825] hover:text-[#f9a825]"
          }`}
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>

        {[
          ["flex sm:hidden", windowed(page, pages, 0, 5)],
          ["hidden sm:flex", windowed(page, pages, 1, 7)],
        ].map(([shown, entries]) => (
          <div key={shown} className={`${shown} items-center gap-1 sm:gap-2`}>
            {entries.map((entry) =>
              typeof entry === "number" ? (
                <button
                  key={entry}
                  type="button"
                  onClick={() => go(entry)}
                  aria-current={entry === page ? "page" : undefined}
                  className={`flex h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center rounded-full px-3 text-[13px] leading-[20px] font-bold transition-colors ${
                    entry === page
                      ? "bg-[#f9a825] text-white"
                      : "border-[0.701px] border-solid border-[#e5e7eb] bg-white text-[#4a5565] hover:border-[#f9a825] hover:text-[#f9a825]"
                  }`}
                >
                  {entry}
                </button>
              ) : (
                <span key={entry} className="px-1 text-[13px] leading-[20px] text-[#99a1af]">
                  …
                </span>
              )
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page >= pages}
          aria-label="Next page"
          className={`${step} ${
            page >= pages
              ? "cursor-not-allowed border-[#f3f4f6] text-[#d1d5dc]"
              : "border-[#e5e7eb] text-[#1f2937] hover:border-[#f9a825] hover:text-[#f9a825]"
          }`}
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
