import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Numbered pages for the catalogues the backend slices.
 *
 * Long runs collapse to first · … · neighbours · … · last, so a 37-page
 * catalogue still fits on a phone.
 */
const windowed = (page, pages) => {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);

  const near = [page - 1, page, page + 1].filter((n) => n > 1 && n < pages);
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
    "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-[0.701px] border-solid transition-colors";

  return (
    <div className="flex w-full flex-col items-center pt-10">
      <p className="text-[13px] leading-[20px] text-[#99a1af]">
        Page {page} of {pages} · {total} {noun}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
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

        {windowed(page, pages).map((entry) =>
          typeof entry === "number" ? (
            <button
              key={entry}
              type="button"
              onClick={() => go(entry)}
              aria-current={entry === page ? "page" : undefined}
              className={`flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-full px-3 text-[13px] leading-[20px] font-bold transition-colors ${
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
